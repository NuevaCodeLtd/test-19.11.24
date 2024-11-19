import React, { FC } from 'react'
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material'

interface SnackBarProps {
  isOpen: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
}

const SnackBar: FC<SnackBarProps> = ({
  isOpen,
  message,
  severity,
  onClose
}) => {
  const [open, setOpen] = React.useState(isOpen)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    onClose?.()
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SnackBar
