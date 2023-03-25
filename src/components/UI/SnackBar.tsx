import { Alert, Snackbar, AlertColor } from '@mui/material'

type Props = {
  isOpen: boolean
  onClose: () => void
  message: string
  severity: AlertColor
  autoHideDuration?: number
}
const SnackBarModal = ({
  isOpen,
  onClose,
  message,
  severity,
  autoHideDuration,
}: Props) => {
  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration || 4000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackBarModal
