'use client'

import React, { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import { NotificationsProvider } from '@toolpad/core/useNotifications'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { CssBaseline } from '@mui/material'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationsProvider>{children}</NotificationsProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default Providers
