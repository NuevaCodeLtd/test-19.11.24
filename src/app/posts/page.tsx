import { AllPosts } from '@/components'
import { getAllPosts } from '@/lib/post-utils'
import type { ServerSideComponentProps } from '@/common-types/types'

type PostsPage = ServerSideComponentProps<{ id: string }, { page: number }>

export default async function PostsPage({ searchParams }: PostsPage) {
  const postsData = getAllPosts(searchParams.page || 1)

  return (
    <div>
      <AllPosts postsData={postsData} title='All Posts' />
    </div>
  )
}
