import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { signOut } from '../../store/auth/auth.thunk'
import useAppDispatch from '../../hooks/useAppDispatch'

const menus = [
  {
    path: 'meals',
    title: 'Meals',
  },
  {
    path: 'orders',
    title: 'Orders',
  },
]

const Header = () => {
  const dispatch = useAppDispatch()

  const signOutNavigateHandler = () => {
    dispatch(signOut())
  }
  return (
    <AppBarStyled position="static">
      <Toolbar>
        <Container>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {menus.map((item) => (
            <LinkStyle
              key={item.path}
              to={item.path}
              style={{ marginRight: '10px' }}
            >
              <Title variant="h6" sx={{ flexGrow: 1 }}>
                {item.title}
              </Title>
            </LinkStyle>
          ))}

          <ButtonStyled variant="contained" onClick={signOutNavigateHandler}>
            Sign Out
          </ButtonStyled>
        </Container>
      </Toolbar>
    </AppBarStyled>
  )
}

export default Header

const Container = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const AppBarStyled = styled(AppBar)`
  background-color: rgba(138, 43, 6, 1);
  padding: 10px;
  margin-bottom: 3rem;
`
const ButtonStyled = styled(Button)`
  background-color: rgba(90, 31, 8, 1);
  border-radius: 20px;
  padding: 10px;
  &:hover {
    background-color: rgba(138, 43, 6, 1);
  }
`
const Title = styled(Typography)`
  color: #fff;
  font-size: 26px;
`
const LinkStyle = styled(NavLink)`
  text-decoration: none;
`
