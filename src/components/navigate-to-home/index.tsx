import { IconButton, Stack } from '@mui/material'
import { Home } from '@mui/icons-material'
import { NavigationLinks } from '@/constant'
import Link from 'next/link'

export default function NavigateToHome() {
  return (
    <Link href={NavigationLinks.HOME}>
      <Stack gap={1} direction={'row'} alignItems={'center'}>
        <IconButton>
          <Home />
        </IconButton>
        Go to Home Page
      </Stack>
    </Link>
  )
}
