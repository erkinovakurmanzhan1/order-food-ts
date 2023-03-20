import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <Grid>
        <Outlet />
      </Grid>
    </div>
  )
}

export default AdminLayout
