'use client'
import Link from 'next/link'
import { NavigationLinks } from '@/constant'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

export default function MainNavigation() {
  const navItems = [
    {
      label: 'New Post',
      link: NavigationLinks.ADD_POST
    }
  ]

  return (
    <AppBar
      component='nav'
      variant='outlined'
      sx={{
        background: 'rgba(179, 191, 215, 0.23)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(7.4px)',
        WebkitBackdropFilter: 'blur(7.4px)',
        border: '1px solid rgba(179, 191, 215, 0.3)'
      }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          color='text.primary'
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <Link href={NavigationLinks.HOME}>My Blog Post 🤓</Link>
        </Typography>

        {navItems.map(el => (
          <Link href={el.link} key={el.label}>
            <Button
              sx={{
                color: '#000',
                textTransform: 'capitalize',
                fontSize: '16px'
              }}
              variant='text'
            >
              ➕ {el.label}
            </Button>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  )
}
