import { Button, Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import {
  deleteMeal,
  editMeals,
  getAllMeals,
} from '../../store/meals/meals.thunk'
import { RootState } from '../../store/store'
import AppTable from '../../components/UI/Table'
import { Column, Meal } from '../../common/types'
import MealModal, {
  FormSchema,
} from '../../components/admin/pages/meals/MealModal'
import { useSearchParams } from 'react-router-dom'

const Meals = () => {
  const dispatch = useAppDispatch()
  const meals = useSelector((state: RootState) => state.meals.items)

  const [params, setParams] = useSearchParams()
  useEffect(() => {
    dispatch(getAllMeals())
  }, [])

  const showModalHandler = (mode: 'add' | 'edit') => {
    params.set('modal', mode)
    setParams(params)
  }
  const closeModalHandler = () => {
    params.delete('modal')
    setParams(params)
  }
  const isModalOpen = !!params.get('modal')

  const deleteMealHandler = (id: string) => {
    dispatch(deleteMeal(id))
  }
  const editMealHandler = (id: string) => {
    showModalHandler('edit')
    params.set('mealId', id)
    setParams(params)
  }

  const columns: Column<Meal>[] = [
    {
      header: '№',
      key: '_id',
      index: true,
    },
    {
      header: 'Title',
      key: 'title',
    },
    {
      header: 'Price',
      key: 'price',
    },
    {
      header: 'Description',
      key: 'description',
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (meal: Meal) => (
        <Grid>
          <IconButton onClick={() => editMealHandler(meal._id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteMealHandler(meal._id)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      ),
    },
  ]

  const saveHandler = (id: string, values: FormSchema) => {
    dispatch(editMeals({ id, values }))
  }

  return (
    <Grid>
      <Button variant="contained" onClick={() => showModalHandler('add')}>
        Add new meal
      </Button>
      <MealModal
        open={isModalOpen}
        onClose={closeModalHandler}
        onSubmit={saveHandler}
      />
      <Grid>
        <AppTable
          columns={columns}
          rows={meals}
          getUniqueId={(val) => val._id}
        />
      </Grid>
    </Grid>
  )
}
export default Meals
