'use client'

import Link from 'next/link'
import { Tag } from '@/common-types/types'
import NavigateToHome from '@/components/navigate-to-home'
import DeletePostButton from '@/components/delete-post'
import { NavigationLinks } from '@/constant'
import {
  Avatar,
  Button,
  Chip,
  Stack,
  Typography,
  Box,
  Divider
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Image from 'next/image'

interface PostHeaderProps {
  id: number
  slug: string
  title: string
  image: string
  imageDescription: string
  imageCredit: string
  excerpt: string
  date: string
  readTime: number
  tags: Tag[]
  authorId: number
}

export default function PostHeader({
  id,
  slug,
  title,
  image,
  imageDescription,
  imageCredit,
  excerpt,
  date,
  readTime,
  tags,
  authorId
}: PostHeaderProps) {
  const publicationDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={2}
        alignItems='center'
        justifyContent={'flex-end'}
        mb={2}
      >
        <DeletePostButton postId={id} redirectUrl={NavigationLinks.POSTS} />
        <Link href={`${NavigationLinks.EDIT_POST}/${slug}`}>
          <Button
            size='small'
            variant='outlined'
            sx={{ textTransform: 'capitalize' }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Link>
      </Stack>

      <Typography variant='h4' gutterBottom>
        {title}
      </Typography>

      <Typography variant='body1' sx={{ color: 'text.secondary' }} gutterBottom>
        {excerpt}
      </Typography>

      <figure>
        <Box
          overflow='hidden'
          width='100%'
          height='500px'
          position={'relative'}
          mb={2}
        >
          <Image
            src={image}
            alt={'Image'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {imageDescription && (
          <figcaption
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <InfoOutlinedIcon
              fontSize='small'
              sx={{ color: 'text.secondary' }}
            />
            <Typography variant='caption' color='text.secondary'>
              {imageDescription} {' / '} {imageCredit}
            </Typography>
          </figcaption>
        )}
      </figure>

      <Stack direction='row' alignItems='center' spacing={1} mt={2}>
        <Avatar
          alt={`Author ${authorId}`}
          src={`/images/site/avatars/avatar-${authorId % 6 || 1}.jpg`}
        />
        <Typography variant='body2' color='text.secondary'>
          The article was posted: <time>{publicationDate}</time> | {readTime}{' '}
          min read
        </Typography>
      </Stack>

      {tags && (
        <Stack direction='row' flexWrap='wrap' gap={1} mt={2}>
          {tags.map((tag, ind) => (
            <Link href={`/tags/${tag.name}`} key={ind}>
              <Chip label={`#${tag.name}`} variant='outlined' size='small' />
            </Link>
          ))}
        </Stack>
      )}

      <Divider sx={{ my: 2 }} />
    </>
  )
}
