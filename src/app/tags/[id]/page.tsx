import AllPosts from '@/components/all-posts'
import { getPostsByTag } from '@/lib/post-utils'
import type { ServerSideComponentProps } from '@/common-types/types'

type PostsByTagPage = ServerSideComponentProps<{ id: string }, { page: number }>

export default async function PostsByTagPage({
  params,
  searchParams
}: PostsByTagPage) {
  const postsData = getPostsByTag(params.id, searchParams.page || 1)

  return (
    <div>
      <AllPosts postsData={postsData} title='Posts by Tags' />
    </div>
  )
}
