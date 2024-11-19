'use client'

import PostHeader from '../post-header'
import {
  calculateReadTime,
  getRelatedPosts,
  getSinglePost
} from '@/lib/post-utils'
import xss from 'xss'
import { Box, Typography, Paper, Divider } from '@mui/material'
import PostsGrid from '@/components/posts-grid'

interface PostContentProps {
  content: ReturnType<typeof getSinglePost>
  relatedPosts: ReturnType<typeof getRelatedPosts>
}

export default function PostContent({
  content,
  relatedPosts
}: PostContentProps) {
  if (!content) return null

  return (
    <Paper
      elevation={0}
      sx={{ padding: '30px 50px', borderRadius: 2, marginBottom: 4 }}
    >
      <article>
        <PostHeader
          id={content.id}
          slug={content.slug}
          title={content.title}
          image={content.featured_image}
          imageDescription={content.featured_image_description || ''}
          imageCredit={content.featured_image_credit || ''}
          tags={content.tags}
          excerpt={content.summary}
          date={content.created_at}
          readTime={calculateReadTime(content.content)}
          authorId={content.author_id}
        />

        <Box
          dangerouslySetInnerHTML={{ __html: xss(content.content) }}
          sx={{ typography: 'body1', lineHeight: 1.6 }}
          mb={5}
        />

        <Divider />

        {relatedPosts.length > 0 && (
          <Box mt={4}>
            <Typography variant='h6' component='h2' gutterBottom>
              Related Posts
            </Typography>
            <Typography variant='body2' gutterBottom mb={5}>
              You might also be interested in:
            </Typography>

            <PostsGrid posts={relatedPosts} variant='outlined' />
          </Box>
        )}
      </article>
    </Paper>
  )
}
