import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Modal, TextField } from '@mui/material'
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
  width: 400,
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
  console.log(id)

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
      : dispatch(addMeals(values))
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            error={!!errors.title}
            {...register('title')}
            label="title"
          />
          <TextField
            error={!!errors.description}
            {...register('description')}
            label="description"
          />
          <TextField
            error={!!errors.price}
            {...register('price', { valueAsNumber: true })}
            label="price"
          />
          <Button variant="outlined" color="info" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default MealModal
