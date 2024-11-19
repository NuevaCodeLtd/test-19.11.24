import styled from '@emotion/styled'
import { Typography } from '@mui/material'

const ClampedText = styled(Typography)<{ lines: number }>(({ lines }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: lines,
  lineHeight: '1.5em',
  height: `${lines * 1.5}em`,
  maxHeight: `${lines * 1.5}em`
}))

export default ClampedText
