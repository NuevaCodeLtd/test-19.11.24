'use client'

import PostItem from '../post-item'
import { Post } from '@/common-types/types'
import { Grid } from '@mui/material'

interface PostsGridProps {
  posts: Post[]
  variant?: string
}

export default function PostsGrid({ posts, variant }: PostsGridProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {posts.map(post => (
        <Grid item xs={2} sm={4} md={3} key={post.slug}>
          <PostItem key={post.slug} post={post} variant={variant} />
        </Grid>
      ))}
    </Grid>
  )
}
