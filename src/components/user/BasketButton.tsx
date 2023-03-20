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
    background: '#3b0c0c',
    border: 'none',
  },
  '&:hover': {
    background: '#7e1c1c',
  },
  '&:hover > #counter': {
    background: '#631717',
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
}))

const StyledCount = styled('span')(({ theme }) => ({
  background: theme.palette.primary.dark,
  borderRadius: '30px',
  padding: '4px 20px',
  fontWeight: '700',
  fontSize: '20p',
  lineHeight: '27px',
  color: '#fff',
}))
