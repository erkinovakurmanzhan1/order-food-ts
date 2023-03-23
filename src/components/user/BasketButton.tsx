import React from 'react'
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { ButtonProps } from '@mui/material/Button'

type Props = ButtonProps & {
  count: number
}

const BasketButton = ({ count, ...rest }: Props) => {
  return (
    <StyledBasketButton {...rest}>
      <AddShoppingCartTwoToneIcon />
      <StyledTitle>Your cart</StyledTitle>
      <StyledCount id="counter">{count || 0}</StyledCount>
    </StyledBasketButton>
  )
}

export default BasketButton

const StyledBasketButton = styled(Button)(() => ({
  '&': {
    background: '#5A1F08',
    border: 'none',
  },
  '&:hover': {
    background: '#551d07',
  },
  '&:hover > #counter': {
    background: '#5A1F08',
  },
  borderRadius: '20px',
  padding: '10px 32px',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
  textColor: '#ffff',
  border: 'none',
  cursor: 'pointer',

  '&.bump': {
    animation: 'bump 300ms ease-out',
  },

  '@keyframes bump': {
    '0%': {
      transform: 'scale(1)',
    },
    '10%': {
      transform: 'scale(0.9)',
    },
    '30%': {
      transform: 'scale(1.1)',
    },
    '50%': {
      transform: 'scale(1.15)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}))

const StyledTitle = styled('span')(() => ({
  marginLeft: '12px',
  marginRight: '24px',
  color: '#ffffff',
}))

const StyledCount = styled('span')(() => ({
  background: '#742828',
  borderRadius: '30px',
  padding: '4px 20px',
  fontWeight: '700',
  fontSize: '20p',
  lineHeight: '27px',
  color: '#fff',
}))
