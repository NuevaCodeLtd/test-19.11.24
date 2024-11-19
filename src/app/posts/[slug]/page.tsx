import { getRelatedPosts, getSinglePost } from '@/lib/post-utils'
import PostContent from '@/components/post-item/post-content'
import { ServerSideComponentProps } from '@/common-types/types'
import type { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

type PostPageProps = ServerSideComponentProps<{ slug: string }>

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const post = getSinglePost(params.slug)
  const {
    meta_description = '',
    meta_title = '',
    created_at,
    updated_at,
    language
  } = post || {}
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${params.slug}`

  return getMetadata({
    metaTitle: meta_title,
    metaDescription: meta_description,
    canonicalUrl,
    createdAt: created_at || new Date().toISOString(),
    updatedAt: updated_at || new Date().toISOString(),
    locale: language || 'en'
  })
}

export default function PostPage({ params }: PostPageProps) {
  const post = getSinglePost(params.slug)
  const relatedPosts = getRelatedPosts(post?.relatedPosts ?? [])

  return <PostContent content={post} relatedPosts={relatedPosts} />
}

export const revalidate = 6000
