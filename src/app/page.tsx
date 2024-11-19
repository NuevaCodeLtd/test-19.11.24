import { getAllPosts } from '@/lib/post-utils'
import { getMetadata } from '@/lib/metadata'
import { AllPosts } from '@/components'
import { ServerSideComponentProps } from '@/common-types/types'

const META_TITLE = 'Blog About English - My thoughts'
const META_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aperiam assumenda, atque autem cumque.'
const CANONICAL_URL = '/'

export const metadata = getMetadata({
  metaTitle: META_TITLE,
  metaDescription: META_DESCRIPTION,
  canonicalUrl: CANONICAL_URL,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  locale: 'en'
})

type PostsPage = ServerSideComponentProps<null, { page?: number }>

export default function HomePage({ searchParams }: PostsPage) {
  const postsData = getAllPosts(searchParams.page || 1)

  return (
    <>
      <AllPosts postsData={postsData} />
    </>
  )
}