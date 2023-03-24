import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Column, OrderAdmin } from '../../common/types'
import AppTable from '../../components/UI/Table'
import useAppDispatch from '../../hooks/useAppDispatch'
import Header from '../../layout/user/Header'
import { getMyOrder } from '../../store/order/order.thunk'
import { RootState } from '../../store/store'

type Props = {
  onShowBasket: () => void
}

const UserOrders = ({ onShowBasket }: Props) => {
  const dispatch = useAppDispatch()
  const order = useSelector((state: RootState) => state.orders.items)
  console.log(order)

  useEffect(() => {
    dispatch(getMyOrder())
  }, [dispatch])
  const showBasketHandler = () => {
    return onShowBasket()
  }

  const columns: Column<OrderAdmin>[] = [
    {
      header: '№',
      key: '_id',
      index: true,
    },
    {
      header: 'Total Price',
      key: 'total price',
      render: (meal: OrderAdmin) => (
        <Grid>
          <h4>Total Price:{meal.totalPrice}</h4>
        </Grid>
      ),
    },
    {
      header: 'Meals',
      key: 'meals',
      render: (meal: OrderAdmin) => (
        <Grid>
          {meal.items.map((item) => (
            <MealsContainer key={item._id}>
              <li>meal name: {item.title}</li>
              <li>price: {item.price}</li>
              <li>count: {item.amount}</li>
            </MealsContainer>
          ))}
        </Grid>
      ),
    },
  ]
  return (
    <Grid>
      <Header onShowBasket={showBasketHandler} />
      <TableStyle>
        <AppTable
          columns={columns}
          rows={order}
          getUniqueId={(val) => val._id}
        />
      </TableStyle>
    </Grid>
  )
}

export default UserOrders
const TableStyle = styled(Grid)`
  margin-top: 9rem;
`
const MealsContainer = styled('ul')`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  padding: 10px;
  border: 1px solid #000;
  margin-top: 0.6rem;
  border-radius: 10px;
`
