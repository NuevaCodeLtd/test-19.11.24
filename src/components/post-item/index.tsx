/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { Post } from '@/common-types/types'
import { NavigationLinks } from '@/constant'
import DeletePostButton from '@/components/delete-post'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import ClampedText from '@/components/clamped-text'
import Image from 'next/image'

interface PostItemProps {
  post: Post
  variant?: string
}

export default function PostItem({ post, variant }: PostItemProps) {
  const {
    id,
    title,
    summary,
    slug,
    tags,
    created_at,
    featured_image,
    author_id
  } = post
  const router = useRouter()
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const handlerRedirectToPost = () => {
    const linkPath = `${NavigationLinks.POSTS}/${slug}`
    router.push(linkPath)
  }

  const handleRedirectToTag = (tagName: string) => {
    const linkPath = `${NavigationLinks.TAGS}/${tagName}`
    router.push(linkPath)
  }

  return (
    <Card
      sx={{
        borderRadius: 5,
        '&:hover': {
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.3s ease-in-out'
        }
      }}
      elevation={0}
      variant={variant as any}
    >
      <Box flexGrow={1}>
        <Link
          href={`${NavigationLinks.POSTS}/${slug}`}
          style={{ display: 'block ' }}
        >
          <Box
            overflow='hidden'
            width='100%'
            height='140px'
            position={'relative'}
          >
            <Image
              src={featured_image}
              alt={'Image'}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Link>
        <CardContent>
          <Stack direction={'row'} gap={2} alignItems={'center'} mb={1}>
            <Avatar
              alt='John Doe'
              src={`/images/site/avatars/avatar-${author_id % 5 || 1}.jpg`}
              sx={{ width: 28, height: 28 }}
            />
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              {formattedDate}
            </Typography>
          </Stack>

          <Link
            href={`${NavigationLinks.POSTS}/${slug}`}
            style={{ display: 'block ' }}
          >
            <ClampedText lines={2} variant='h6' gutterBottom>
              {title}
            </ClampedText>
          </Link>

          <ClampedText
            lines={3}
            variant='body2'
            sx={{ color: 'text.secondary' }}
            mb={1}
          >
            {summary}
          </ClampedText>

          {tags && (
            <Stack flexDirection='row' flexWrap={'wrap'} gap={2} mt={1}>
              {tags.map((tag, ind) => (
                <Chip
                  label={`#${tag.name}`}
                  variant='filled'
                  size='small'
                  key={ind}
                  sx={{ cursor: 'pointer', fontSize: '0.55rem' }}
                  onClick={e => {
                    e.stopPropagation()
                    handleRedirectToTag(tag.name)
                  }}
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </Box>

      {/* <CardActions>
        <Link href={`${NavigationLinks.EDIT_POST}/${slug}`}>
          <Button
            size='small'
            sx={{ textTransform: 'capitalize' }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Link>
        <DeletePostButton postId={id} />
      </CardActions> */}
    </Card>
  )
}
