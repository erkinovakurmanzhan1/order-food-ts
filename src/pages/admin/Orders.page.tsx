import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Column, OrderAdmin } from '../../common/types'
import AppTable from '../../components/UI/Table'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllOrders } from '../../store/order/order.thunk'
import { RootState } from '../../store/store'

const OrdersPage = () => {
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.orders.itemsAll)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

  const columns: Column<OrderAdmin>[] = [
    {
      header: '№',
      key: '_id',
      index: true,
    },
    {
      header: 'Date',
      key: 'date',
      render: (meal: OrderAdmin) => (
        <Grid>
          <h4>{meal.createdAt}</h4>
        </Grid>
      ),
    },
    {
      header: 'Name',
      key: 'name',
      render: (meal: OrderAdmin) => (
        <Grid>
          <h2>{meal.user.name}</h2>
        </Grid>
      ),
    },

    {
      header: 'Meals',
      key: 'meals',
      render: (meal: OrderAdmin) => (
        <Grid>
          {meal.items.map((item) => (
            <MealsList key={item._id}>
              <li>{item.title}</li>
              <li>price: {item.price}</li>
              <li>count: {item.amount}</li>
            </MealsList>
          ))}
        </Grid>
      ),
    },
    {
      header: 'Total price',
      key: 'total price',
      render: (meal: OrderAdmin) => (
        <TotalPriceStyle>
          <h3>{meal.totalPrice}</h3>
        </TotalPriceStyle>
      ),
    },
  ]
  return (
    <Grid>
      <AppTable columns={columns} rows={items} getUniqueId={(val) => val._id} />
    </Grid>
  )
}

export default OrdersPage
const MealsList = styled('ul')`
  list-style: none;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
  padding: 0.5rem;
  color: #411c0d;
`
const TotalPriceStyle = styled(Grid)`
  margin-left: 2rem;
`
