import { FormControl } from '@mui/material'
import { styled } from '@mui/system'
import { memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllMeals } from '../../store/meals/meals.thunk'
import { RootState } from '../../store/store'
import MealItem from './meal-item/MealItem'

const Meals = () => {
  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.meals
  )
  const [sortDirection, setSortDirection] = useState<string>('')

  useEffect(() => {
    dispatch(getAllMeals())
  }, [dispatch])

  const sortedMeals = useMemo(() => {
    const notSorted = [...items]

    return notSorted.sort((a, b) => {
      if (sortDirection === 'ASC') {
        return a.price - b.price
      }
      return b.price - a.price
    })
  }, [sortDirection, items])

  return (
    <Card>
      {isLoading || error ? null : (
        <FormControl sx={{ m: 2, minWidth: 130 }} size="small">
          <StyledSelect
            value={sortDirection}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortDirection(e.target.value)
            }
          >
            <option value="">
              <b>none</b>
            </option>
            <option value="ASC">cheaper</option>
            <option value="DESC">more expensive</option>
          </StyledSelect>
        </FormControl>
      )}

      {isLoading && !error && <p>loading ...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sortedMeals.map((meal) => {
        return <MealItem meal={meal} key={meal._id} />
      })}
    </Card>
  )
}

export default memo(Meals)

const StyledSelect = styled('select')(() => ({
  '&': {
    width: '230px',
    padding: '10px',
    color: '#5A1F08',
    fontSize: '22px',
    marginBottom: '2rem',
  },
}))

const Card = styled('div')`
  padding: 40px 40px 36px 40px;
  background: #ffffff;
  border-radius: 16px;
  width: 75%;
  margin: 90px auto;
`
