import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import UserRoles from '../common/types'
import AdminLayout from '../layout/admin/Index'
import SignIn from '../layout/guest/SignIn'
import SignUp from '../layout/guest/SignUp'
import UserLayout from '../layout/user'
import Meals from '../pages/admin/Meals.page'
import OrdersPage from '../pages/admin/Orders.page'
import NotFound from '../pages/NotFound'
import MealsPage from '../pages/user/Meals'
import UserOrders from '../pages/user/UserOrders'
import { RootState } from '../store/store'
import { ProtectectedRoute } from './ProtectedRoutes'

const AppRoutes = () => {
  const role = useSelector((state: RootState) => state.auth.user.role)

  const isAllowed = (roles: UserRoles[]) => {
    return roles.includes(role)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectectedRoute
            isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
            fallBackPath="/admin/meals"
            component={UserLayout}
          />
        }
      >
        <Route
          index
          element={
            <ProtectectedRoute
              isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
              fallBackPath="/admin/meals"
              component={MealsPage}
            />
          }
        />
        <Route
          path="signup"
          element={
            <ProtectectedRoute
              isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
              fallBackPath={role === UserRoles.ADMIN ? '/admin/meals' : '/'}
              component={SignUp}
            />
          }
        />
        <Route
          path="signin"
          element={
            <ProtectectedRoute
              isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
              fallBackPath={role === UserRoles.ADMIN ? '/admin/meals' : '/'}
              component={SignIn}
            />
          }
        />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectectedRoute
            isAllowed={isAllowed([UserRoles.ADMIN])}
            fallBackPath="/"
            component={AdminLayout}
          />
        }
      >
        <Route
          path="meals"
          element={
            <ProtectectedRoute
              isAllowed={isAllowed([UserRoles.ADMIN])}
              fallBackPath="/"
              component={Meals}
            />
          }
        />
        <Route
          path="orders"
          element={
            <ProtectectedRoute
              isAllowed={isAllowed([UserRoles.ADMIN])}
              fallBackPath="/"
              component={OrdersPage}
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route
        path="/userOrders"
        element={
          <UserOrders
            onShowBasket={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        }
      />
    </Routes>
  )
}

export default AppRoutes
