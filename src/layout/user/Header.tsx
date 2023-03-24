import { AppBar, Button, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BasketButton from '../../components/user/BasketButton'
import useAppDispatch from '../../hooks/useAppDispatch'
import { signOut } from '../../store/auth/auth.thunk'
import { getBasket } from '../../store/basket/basket.thunk'
import { RootState } from '../../store/store'

type Props = {
  onShowBasket: () => void
}

function Header({ onShowBasket }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  )
  const { items } = useSelector((state: RootState) => state.basket)
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    dispatch(getBasket())
  }, [dispatch])

  const calculateTotalAmount = () => {
    const sum = items.reduce((s, item) => s + item.amount, 0)
    return sum
  }

  useEffect(() => {
    setAnimationClass('bump')

    const id = setTimeout(() => {
      setAnimationClass('')
    }, 300)

    return () => {
      clearTimeout(id)
    }
  }, [items])

  const signInNavigateChangeHandler = () => {
    navigate('/signin')
  }
  const signOutNavigateHandler = () => {
    dispatch(signOut())
  }

  const showBasketHandler = () => {
    return onShowBasket()
  }
  return (
    <Container>
      <StyledLink to="/">
        <p>ReactMeals</p>
      </StyledLink>
      <Box>
        {isAuthorized && (
          <LinkOrderStyle to="/userOrders">
            <h2>My Orders</h2>
          </LinkOrderStyle>
        )}
        <BasketButton
          className={animationClass}
          onClick={showBasketHandler}
          count={calculateTotalAmount()}
        />

        {isAuthorized ? (
          <SignInBtnStyled variant="contained" onClick={signOutNavigateHandler}>
            Sign Out
          </SignInBtnStyled>
        ) : (
          <SignInBtnStyled
            variant="contained"
            onClick={signInNavigateChangeHandler}
          >
            Sign In
          </SignInBtnStyled>
        )}
      </Box>
    </Container>
  )
}

export default Header

const Container = styled(AppBar)(() => ({
  '&': {
    background: 'rgba(138, 43, 6, 1)',
    width: '100%',
    height: ' 101px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '120px',
    paddingRight: '120px',
  },
}))

const SignInBtnStyled = styled(Button)(() => ({
  '&': {
    border: `1px solid solid`,
    background: '#331010',
    color: '#fff',
    borderRadius: '30px',
    marginLeft: '10rem',
    '&:hover': {
      background: 'rgba(153, 49, 8, 1)',
    },
  },
}))
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 32px;
  font-weight: 600;
`

const LinkOrderStyle = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  margin: 1rem 3rem 0 0;
  font-weight: 400;
`
const Box = styled(Grid)`
  display: flex;
`
