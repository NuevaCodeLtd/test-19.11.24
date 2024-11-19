'use client'
import React, { FC, useState, useEffect } from 'react'
import { Fab } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useScrollTrigger } from '@mui/material'

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const trigger = useScrollTrigger({
    threshold: 600
  })

  useEffect(() => {
    setIsVisible(trigger)
  }, [trigger])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <Fab
          onClick={scrollToTop}
          color='primary'
          aria-label='scroll to top'
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </>
  )
}

export default ScrollToTop
