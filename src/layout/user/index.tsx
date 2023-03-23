import { Grid } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Basket from '../../components/basket/Basket'
import Header from './Header'

const UserLayout = () => {
  const [isBasketVisible, setBasketVisisble] = useState(false)
  const showBasketHandler = useCallback(() => {
    setBasketVisisble((prevState) => !prevState)
  }, [])

  return (
    <div>
      <Header onShowBasket={showBasketHandler} />
      <Basket open={isBasketVisible} onClose={showBasketHandler} />
      <Grid>
        <Outlet />
      </Grid>
    </div>
  )
}

export default UserLayout
