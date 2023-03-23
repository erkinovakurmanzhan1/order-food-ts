import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

interface Props {
  onOrder: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
  price: number
}
const TotalAmount = ({ onClose, onOrder, price }: Props) => {
  const orderButton = price > 0 && (
    <StyledOrderButtons onClick={onOrder}>Order</StyledOrderButtons>
  )

  const fixedPrice = price.toFixed(2)
  return (
    <div>
      <InfoContainer>
        <Label>Total amount</Label>
        <Price>${fixedPrice}</Price>
      </InfoContainer>
      <ActionButtonsContainer>
        <StyledCLoseButtons onClick={onClose} variant="outlined">
          Close
        </StyledCLoseButtons>
        {orderButton}
      </ActionButtonsContainer>
    </div>
  )
}

export default TotalAmount

const StyledCLoseButtons = styled(Button)(() => ({
  '&': {
    padding: '7px 14px',
    background: 'none',
    borderRadius: '20px',
    color: '#632107',
    border: '1px solid rgba(138, 43, 6, 1)',
  },
  '&:hover': {
    border: 'none',
    background: '#8a2b06',
    color: '#FFFF',
  },
  '&:active': {
    background: '#863717',
    color: '#FFFF',
  },
}))
const StyledOrderButtons = styled(Button)(() => ({
  '&': {
    padding: '7px 14px',
    background: '#8a2b06',
    border: `2px solid #632107`,
    borderRadius: '20px',
    color: '#FFFF',
  },
  '&:hover': {
    border: 'none',
    background: '#662a12',
    color: 'white',
  },
  '&:active': {
    background: '#461807',
  },
}))
const Label = styled('p')`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  margin: 0;
`

const ActionButtonsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 16px;
`

const Price = styled('p')`
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: #8a2b06;
  margin: 0;
`
const InfoContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`
