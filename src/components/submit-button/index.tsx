import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { LoadingButton } from '@mui/lab'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  submitText?: string
  loadingText?: string
  setIsLoading?: Dispatch<SetStateAction<boolean>>
}

const SubmitButton: FC<SubmitButtonProps> = ({
  submitText = 'Save',
  loadingText = 'Loading...',
  setIsLoading
}) => {
  const { pending } = useFormStatus()

  useEffect(() => {
    setIsLoading?.(pending)
  }, [pending, setIsLoading])

  return (
    <>
      <LoadingButton
        data-testid={'submit-add-edit-button'}
        type='submit'
        variant='contained'
        loading={pending}
        sx={{
          width: '30%',
          marginTop: 7
        }}
      >
        {pending ? loadingText : submitText}
      </LoadingButton>
    </>
  )
}

export default SubmitButton
