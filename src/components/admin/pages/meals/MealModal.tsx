import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import zod from 'zod'
import mealsService from '../../../../api/mealsService'
import useAppDispatch from '../../../../hooks/useAppDispatch'
import { addMeals } from '../../../../store/meals/meals.thunk'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
}

const schema = zod.object({
  title: zod.string().nonempty(),
  description: zod.string().nonempty(),
  price: zod.number().min(1),
})

export type FormSchema = (typeof schema)['_output']

export type Data = {
  id: string
  values: FormSchema
}
type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (id: string, values: FormSchema) => void
}

const MealModal = ({ open, onClose, onSubmit }: Props) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      price: 0,
      title: '',
      description: '',
    },
    resolver: zodResolver(schema),
  })

  const id = searchParams.get('mealId') || '1'

  useEffect(() => {
    const mealId = searchParams.get('mealId')
    if (open && searchParams.get('modal') === 'edit' && mealId) {
      mealsService.getMealById(mealId).then(({ data }) => {
        reset(data.data)
      })
    }
  }, [open])
  const submitHandler = (values: FormSchema) => {
    open && searchParams.get('modal') === 'edit'
      ? onSubmit(id, values)
      : dispatch(addMeals(values)).then(() => onClose())
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <ContainerModal>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextFieldStyle
              error={!!errors.title}
              {...register('title')}
              label="title"
            />
            <TextFieldStyle
              error={!!errors.description}
              {...register('description')}
              label="description"
            />
            <TextFieldStyle
              error={!!errors.price}
              {...register('price', { valueAsNumber: true })}
              label="price"
            />
            <ButtonsBox>
              <CancelStyle variant="outlined" color="info" onClick={onClose}>
                Cancel
              </CancelStyle>
              <SaveStyle type="submit" variant="outlined" color="primary">
                Save
              </SaveStyle>
            </ButtonsBox>
          </form>
        </ContainerModal>
      </Box>
    </Modal>
  )
}

export default MealModal
const ContainerModal = styled(Grid)`
  display: 'flex';
  margin-left: 2.8rem;
`

const TextFieldStyle = styled(TextField)`
  width: 330px;
  margin-bottom: 1rem;
`
const ButtonsBox = styled(Grid)`
  display: flex;
  justify-content: center;
  margin-right: 1.5rem;
  gap: 30px;
`
const CancelStyle = styled(Button)`
  padding: 8px;
  border: 1px solid #8a2b06;
  color: #8a2b06;
  border-radius: 20px;

  &:hover {
    background-color: rgba(138, 43, 6, 1);
    border: none;
    color: #fff;
  }
  &:active {
    background-color: rgba(153, 49, 8, 1);
    border: none;
    color: #fff;
  }
`
const SaveStyle = styled(Button)`
  border-radius: 30px;
  background-color: rgba(138, 43, 6, 1);
  border: none;
  color: #fff;

  &:hover {
    border: 1px solid #8a2b06;
    color: #8a2b06;
  }
  &:active {
    background-color: rgba(153, 49, 8, 1);
    border: none;
    color: #fff;
  }
`
