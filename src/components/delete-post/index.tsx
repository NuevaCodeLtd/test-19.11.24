'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ERROR_STATUS, SUCCESS_STATUS } from '@/constant'
import deletePost from '@/server-actions/deletePost'
import { LoadingButton } from '@mui/lab'
import { useNotifications } from '@toolpad/core/useNotifications'
import DeleteIcon from '@mui/icons-material/Delete'

interface DeletePostButtonProps {
  postId: number
  redirectUrl?: string
}

export default function DeletePostButton({
  postId,
  redirectUrl
}: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const notifications = useNotifications()

  const handleDeletePost = async () => {
    const response = await deletePost(postId)

    if (response.status === ERROR_STATUS) {
      notifications.show(response.message, {
        severity: ERROR_STATUS,
        autoHideDuration: 3000
      })
    } else if (response.status === SUCCESS_STATUS) {
      notifications.show(response.message, {
        severity: SUCCESS_STATUS,
        autoHideDuration: 3000
      })
    }

    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setIsDeleting(false)
  }

  const confirmDelete = async () => {
    setIsDeleting(true)
    await handleDeletePost()
    handleClose()
  }

  return (
    <>
      <Button
        data-testid='delete-btn'
        size='small'
        variant='outlined'
        sx={{ textTransform: 'capitalize' }}
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <LoadingButton
            data-testid='delete-confirm-btn'
            onClick={confirmDelete}
            color='secondary'
            autoFocus
            loading={isDeleting}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
