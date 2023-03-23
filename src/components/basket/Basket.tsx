import styled from '@emotion/styled'
import { Modal } from '@mui/material'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import {
  deleteBasketItem,
  updateBasketItem,
} from '../../store/basket/basket.thunk'
import { submitOrder } from '../../store/order/order.thunk'
import { RootState } from '../../store/store'
import BasketItem from './BasketItem'
import TotalAmount from './TotalAmount'

type Props = {
  onClose: () => void
  open: boolean
}
export type Info = {
  id: string
  amount: number
}

const Basket = ({ onClose, open }: Props) => {
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.basket.items)

  const decrementAmount = (id: string, amount: number) => {
    if (amount > 1) {
      dispatch(updateBasketItem({ amount: amount - 1, id }))
    } else {
      dispatch(deleteBasketItem(id))
    }
  }

  const incrementAmount = (id: string, amount: number) => {
    dispatch(updateBasketItem({ amount: amount + 1, id }))
  }

  type Total = {
    amount: number
    price: number
  }
  const getTotalPrice = useCallback(() => {
    return items.reduce(
      (sum, { price, amount }: Total) => sum + amount * price,
      0
    )
  }, [items])

  const totalPrice = {
    price: getTotalPrice(),
  }
  const orderSubmitHandler = () => {
    dispatch(submitOrder(totalPrice))
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Container>
        <Content>
          {items.length ? (
            <FixedHeightConteiner>
              {items.map((item) => {
                return (
                  <BasketItem
                    incrementAmount={() =>
                      // eslint-disable-next-line no-underscore-dangle
                      incrementAmount(item._id, item.amount)
                    }
                    decrementAmount={() =>
                      // eslint-disable-next-line no-underscore-dangle
                      decrementAmount(item._id, item.amount)
                    }
                    // eslint-disable-next-line no-underscore-dangle
                    key={item._id}
                    title={item.title}
                    price={item.price}
                    amount={item.amount}
                  />
                )
              })}
            </FixedHeightConteiner>
          ) : null}
          <TotalAmount
            price={getTotalPrice()}
            onClose={onClose}
            onOrder={orderSubmitHandler}
          />
        </Content>
      </Container>
    </Modal>
  )
}

export default Basket

const Content = styled('div')`
  width: 100%;
  height: 100%;
  padding: 0 1rem 1.5rem 1rem;
`
const FixedHeightConteiner = styled('div')`
  max-height: 228px;
  overflow-y: scroll;
`

const Container = styled('div')(() => ({
  background: '#ffff',
  position: 'fixed',
  top: '20vh',
  padding: '1rem',
  borderRadius: '14px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  zIndex: '30',
  animation: 'slide-down 300ms ease-out forwards',
  width: ' 40rem',
  left: 'calc(50% - 20rem)',

  '@keyframes slide-down': {
    from: {
      opacity: '0',
      transform: 'translateY(-3rem)',
    },
    to: {
      opacity: ' 1',
      transform: 'translateY(0)',
    },
  },
}))
