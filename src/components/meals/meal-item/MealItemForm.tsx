import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import useAppDispatch from '../../../hooks/useAppDispatch'
import { addToBasket } from '../../../store/basket/basket.thunk'
import { Basket } from '../../../common/types'

type Props = {
  id: string
  title: string
  price: number
  showAuthModal?: () => void
}
const MealItemForm = ({ id, title, price }: Props) => {
  const dispatch = useAppDispatch()

  const [amount, setAmount] = useState(1)

  const amountChangeHandler = (event: {
    target: { value: string | number }
  }) => {
    setAmount(+event.target.value)
  }

  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const basketItem: Basket = {
      id,
      price,
      title,
      amount,
    }
    dispatch(addToBasket(basketItem))
  }
  return (
    <StyledForm>
      <Container>
        <label htmlFor={id}>Amount</label>
        <StyledTextfield
          onChange={amountChangeHandler}
          id={id}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          value={amount}
        />
      </Container>
      <StyledAddButton onClick={submitHandler}>
        <AddTwoToneIcon />
        Add
      </StyledAddButton>
    </StyledForm>
  )
}

export default MealItemForm

const StyledAddButton = styled(Button)(() => ({
  '&': {
    background: '#5e1414',
    color: '#FFFF',
    borderRadius: '24px',
    width: '65%',
    padding: '9px',
    marginLeft: '3.5rem',
  },
  '&:hover': {
    border: 'none',
    background: '#5e1414',
    color: 'white',
  },
}))

const StyledTextfield = styled(TextField)(() => ({
  '&': {
    width: '70px',
  },
  '& .MuiOutlinedInput-input': {
    padding: '4px 10px',
    fontSize: '14px',
  },
}))

const Container = styled('div')`
  margin-bottom: 12px;
  label {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #222222;
    margin-right: 20px;
  }

  input {
    width: 60px;
    height: 32px;
    border: 1px solid #d6d6d6;
    border-radius: 6px;
    outline: none;
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    padding: 4px 12px;
  }
`
const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
`
