import { getAllTags } from '@/lib/post-utils'
import dynamic from 'next/dynamic';
const AddEditPost = dynamic(() => import('../../components/add-edit-post'), { ssr: false });

export default async function AddPostPage() {
  const tags = getAllTags()

  return (
    <div>
      <AddEditPost tags={tags} />
    </div>
  )
}