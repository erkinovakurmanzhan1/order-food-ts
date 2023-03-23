import { Button, Grid, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useAppDispatch from '../../hooks/useAppDispatch'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signUp } from '../../store/auth/auth.thunk'
import UserRoles from '../../common/types'

const schema = z.object({
  email: z.string().email('write Email'),
  password: z.string().min(6),
  name: z.string(),
  role: z.string(),
  confirm: z.string(),
})

type FormSchema = (typeof schema)['_output']

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirm: '',
      role: UserRoles.USER,
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const submitHandler = (values: FormSchema) => {
    dispatch(signUp(values))
      .unwrap()
      .then(() => navigate('/'))
  }

  return (
    <CridMainContainer>
      <GridContainer>
        <FormContainer onSubmit={handleSubmit(submitHandler)}>
          <TextFieldStyled label="Name" {...register('name')} />
          <TextFieldStyled {...register('email')} label="Email" />
          <TextFieldStyled {...register('password')} label="Password" />
          <TextFieldStyled {...register('confirm')} label="ConfirmPassword" />
          <SignInBtnStyled type="submit">sign up</SignInBtnStyled>
          <StyledLink to="/signin">Have an account?</StyledLink>
        </FormContainer>
      </GridContainer>
    </CridMainContainer>
  )
}

export default SignUp

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
`

const CridMainContainer = styled(Grid)(() => ({
  '&': {
    display: 'flex',
    justifyContent: 'center',
  },
}))
const GridContainer = styled(Grid)(() => ({
  '&': {
    background: '#ffff',
    width: '500px',
    padding: '40px',
    display: 'flex',
    marginTop: '9rem',
    borderRadius: '15px',
    paddingLeft: '3.3rem',
  },
}))
const TextFieldStyled = styled(TextField)(() => ({
  '&': {
    width: '400px',
    marginBottom: '1rem',
  },
}))

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-top: 0.8rem;
`
const SignInBtnStyled = styled(Button)(() => ({
  '&': {
    color: '#000000',
    fontSize: '16px',
    fontWeight: '600',
  },
}))
