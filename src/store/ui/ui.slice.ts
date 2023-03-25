import { AlertColor } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'

type SnackBar = {
  snackbar: {
    isOpen: boolean
    message: string
    severity: AlertColor
  }
}

const initialState: SnackBar = {
  snackbar: {
    isOpen: false,
    message: '',
    severity: 'success',
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackBar(state, action) {
      state.snackbar.isOpen = true
      state.snackbar.message = action.payload.message
      state.snackbar.severity = action.payload.severity
    },
    closeSnackBar(state) {
      state.snackbar = initialState.snackbar
    },
  },
})
export const uiSLiceActions = uiSlice.actions
