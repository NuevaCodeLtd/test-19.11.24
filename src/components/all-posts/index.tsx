'use client'

import PostsGrid from '../posts-grid'
import { Box, Pagination, Stack, Typography } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { NavigationLinks } from '@/constant'
import React from 'react'
import { getAllPosts } from '@/lib/post-utils'

interface AllPostsProps {
  postsData: ReturnType<typeof getAllPosts>
  title?: string
}

export default function AllPosts({ postsData }: AllPostsProps) {
  const { posts, page, totalPages } = postsData
  const router = useRouter()
  const pathname = usePathname()
  const isTagsPage = pathname.startsWith(NavigationLinks.TAGS)

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(
      `${isTagsPage ? pathname : NavigationLinks.POSTS}/?page=${value}`,
      undefined
    )
  }

  return (
    <Box>
      <Typography variant='h3' mt={7} mb={7}>
        Welcome to my world 👋 🌎
      </Typography>

      <PostsGrid posts={posts} />

      {totalPages > 1 && (
        <Stack spacing={2} mt={3}>
          <Pagination
            data-testid='pagination'
            count={totalPages}
            variant='outlined'
            color='primary'
            className='pagination'
            page={+page}
            onChange={handlePaginationChange}
          />
        </Stack>
      )}
    </Box>
  )
}
