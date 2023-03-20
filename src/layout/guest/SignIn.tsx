import { Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from '../../store/auth/auth.thunk'
import useAppDispatch from '../../hooks/useAppDispatch'

const schema = z.object({
  email: z.string().email('write Email'),
  password: z.string().min(6),
})

type FormSchema = (typeof schema)['_output']

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logInError, setLogInError] = useState('')

  const { getValues, handleSubmit, formState, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const submitHandler = (values: FormSchema) => {
    dispatch(signIn(values))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err: string) => {
        setLogInError(err)
      })
  }

  return (
    <CridMainContainer>
      <GridContainer>
        <FormContainerStyled onSubmit={handleSubmit(submitHandler)}>
          <TextFieldStyled
            error={!!formState.errors.email}
            label="Email"
            {...register('email')}
          />
          {formState.errors.email && (
            <Typography
              textAlign="center"
              sx={{ color: (theme) => theme.palette.error.main }}
            >
              {formState.errors.email.message}
            </Typography>
          )}
          <TextFieldStyled
            error={!!formState.errors.password}
            label="Password"
            {...register('password')}
          />
          {formState.errors.password && (
            <Typography
              textAlign="center"
              sx={{ color: (theme) => theme.palette.error.main }}
            >
              {formState.errors.password.message}
            </Typography>
          )}
          <Box>
            <SignInBtnStyled type="submit">sign in</SignInBtnStyled>
            <Link to="/signup">{`Don't have account?`}</Link>
          </Box>
        </FormContainerStyled>
      </GridContainer>
    </CridMainContainer>
  )
}

export default SignIn

const FormContainerStyled = styled('form')(() => ({
  width: '400px',
  background: '#afa9a9',
  marginTop: '4rem',
  padding: '3rem',
  borderRadius: '15px',
}))

const CridMainContainer = styled(Grid)(() => ({
  '&': {
    display: 'flex',
    justifyContent: 'center',
  },
}))
const Box = styled(Grid)(() => ({
  '&': {
    display: 'flex',
    flexDirection: 'column',
  },
}))
const GridContainer = styled(Grid)(() => ({
  '&': {
    background: '#ffff',
    width: '500px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '40px',
    borderRadius: '15px',
  },
}))
const TextFieldStyled = styled(TextField)(() => ({
  '&': {
    marginBottom: '1rem',
  },
}))
const SignInBtnStyled = styled(Button)(() => ({
  '&': {
    color: '#fff',
  },
}))
