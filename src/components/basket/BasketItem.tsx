import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled'
import { Button } from '@mui/material'

type Props = {
  title: string
  price: number
  amount: number
  incrementAmount: () => void
  decrementAmount: () => void
}

const BasketItem = ({
  title,
  price,
  amount,
  incrementAmount,
  decrementAmount,
}: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>
        <PriceAndAmountContainer>
          <Price>${price}</Price>
          <Amount>x{amount}</Amount>
        </PriceAndAmountContainer>
        <CounterContainer>
          <StyledIconsButton
            // borderStyle="squared"
            variant="outlined"
            onClick={decrementAmount}
          >
            <RemoveIcon />
          </StyledIconsButton>
          <StyledIconsButton
            // borderStyle="squared"
            variant="outlined"
            onClick={incrementAmount}
          >
            <AddIcon />
          </StyledIconsButton>
        </CounterContainer>
      </Content>
    </Container>
  )
}

export default BasketItem

const Container = styled('div')`
  padding: 24px 0;
  width: 100%;
`
const Title = styled('p')`
  margin: 0 0 12px 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`
const Price = styled('p')`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #ad5502;
`
const Amount = styled('span')`
  border: 1px solid #d6d6d6;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding: 6px 14px;
  display: block;
`
const PriceAndAmountContainer = styled('div')`
  display: flex;
  align-items: center;
  width: 153px;
  justify-content: space-between;
`

const CounterContainer = styled('div')`
  display: flex;
  gap: 14px;
`
const Content = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledIconsButton = styled(Button)(() => ({
  '&': {
    border: `1px solid rgba(138, 43, 6, 1)`,
    background: 'none',
    color: 'rgba(138, 43, 6, 1)',
  },
  '&:hover': {
    border: 'none',
    background: 'rgba(138, 43, 6, 1)',
    color: '#fff',
  },
  '&:active': {
    background: 'rgba(153, 49, 8, 1)',
    color: '#fff',
  },
}))
