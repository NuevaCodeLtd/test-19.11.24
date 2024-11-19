'use server'

import { revalidatePath } from 'next/cache'
import { deletePostById } from '@/lib/post-utils'
import {ERROR_STATUS, NavigationLinks, SUCCESS_STATUS} from '@/constant'
import {ServerActionResponseState} from '@/common-types/types';

export default async function deletePost(
  postId: number
): Promise<ServerActionResponseState> {
  try {
    // Simulate network request delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    await deletePostById(postId)

    revalidatePath(NavigationLinks.HOME, 'layout')

    return {
      status: SUCCESS_STATUS,
      message: 'Post deleted successfully.'
    }
  } catch (err) {
    return {
      status: ERROR_STATUS,
      message: 'Failed to delete post.',
      errors: [
        {
          path: 'postId',
          message: err instanceof Error ? err.message : 'Unknown error occurred'
        }
      ]
    }
  }
}