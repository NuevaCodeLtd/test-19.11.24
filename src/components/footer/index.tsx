import React from 'react'
import { Container, Grid, Typography, Link, Box } from '@mui/material'
import { Facebook, Twitter, Instagram } from '@mui/icons-material'
import { NavigationLinks } from '@/constant'

const Footer = () => {
  return (
    <footer>
      <Box sx={{ backgroundColor: '#2E3B55', color: 'white', py: 5 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' gutterBottom>
                About Us
              </Typography>
              <Typography variant='body2'>
                This is my blog page. I blog about English language and its
                history. I also write about programming.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' gutterBottom>
                Quick Links
              </Typography>
              <Link
                href={NavigationLinks.POSTS}
                color='inherit'
                underline='hover'
                variant='body2'
              >
                Home
              </Link>
              <br />
              <Link
                href={NavigationLinks.POSTS}
                color='inherit'
                underline='hover'
                variant='body2'
              >
                All Posts
              </Link>
              <br />
              <Link href='#' color='inherit' underline='hover' variant='body2'>
                Contact
              </Link>
              <br />
              <Link href='#' color='inherit' underline='hover' variant='body2'>
                Privacy Policy
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' gutterBottom>
                Follow Us
              </Typography>
              <Box display='flex' justifyContent='flex-start'>
                <Link href='#' color='inherit' sx={{ mr: 2 }}>
                  <Facebook />
                </Link>
                <Link href='#' color='inherit' sx={{ mr: 2 }}>
                  <Twitter />
                </Link>
                <Link href='#' color='inherit'>
                  <Instagram />
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box mt={5} textAlign='center'>
            <Typography variant='body2'>
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
