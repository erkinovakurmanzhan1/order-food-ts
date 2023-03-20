import { AppBar, Button, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BasketButton from '../../components/user/BasketButton'
import { signOut } from '../../store/auth/auth.thunk'
import { AppDispatch, RootState } from '../../store/store'

type Props = {
  onShowBasket: () => void
  // showAuthModal: () => void
}

function Header({ onShowBasket }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  )
  //   const { items } = useSelector((state) => state.basket)
  //   const themeMode = useSelector((state) => state.ui.themeMode)
  const [animationClass, setAnimationClass] = useState('')

  //   useEffect(() => {
  //     dispatch(getBasket())
  //   }, [dispatch])

  //   const calculateTotalAmount = () => {
  //     const sum = items.reduce((s, item) => s + item.amount, 0)
  //     return sum
  //   }

  //   useEffect(() => {
  //     setAnimationClass('bump')

  //     const id = setTimeout(() => {
  //       setAnimationClass('')
  //     }, 300)

  //     return () => {
  //       clearTimeout(id)
  //     }
  //   }, [items])

  //   const themeChangeHandler = () => {
  //     const theme = themeMode === 'light' ? 'dark' : 'light'
  //     dispatch(uiSLiceActions.changeTheme(theme))
  //   }

  const signInNavigateChangeHandler = () => {
    navigate('/signin')
  }
  const signOutNavigateHandler = () => {
    dispatch(signOut())
  }

  // const showBasketHandler = () => {
  //   if (!isAuthorized) {
  //     return showAuthModal()
  //   }
  //   return onShowBasket()
  // }
  return (
    <Container>
      <Link to="/">
        <h2>ReactMeals</h2>
      </Link>
      <Grid>
        <BasketButton
          className={animationClass}
          // onClick={showBasketHandler}
          count={0}
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
      </Grid>
    </Container>
  )
}

export default Header

// const ThemeBtnStyled = styled(Button)(({ theme }) => ({
//   '&': {
//     background: '#571e1e',
//     width: '100px',
//     height: '50px',
//     border: 'none',
//   },
// }))

const Container = styled(AppBar)(() => ({
  '&': {
    background: '#660f0f',
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

// const Logo = styledComponent.p`
//   font-weight: 600;
//   font-size: 38px;
//   line-height: 57px;
//   color: #ffffff;
//   margin: 0;
// `
const SignInBtnStyled = styled(Button)(() => ({
  '&': {
    border: `1px solid solid`,
    background: '#331010',
    color: '#fff',
    marginLeft: '10rem',
  },
}))
