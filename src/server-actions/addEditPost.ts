'use server'

import { ZodError } from 'zod'
import { postSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import {
  ERROR_STATUS,
  GENERIC_ERROR_MESSAGE,
  NavigationLinks,
  SUCCESS_STATUS
} from '@/constant'
import xss from 'xss'
import { Post, ServerActionResponseState } from '@/common-types/types'
import { formDataToObject } from '@/lib/utils'
import { getAllTags, setPost } from '@/lib/post-utils'

export async function addEditPost(
  prevState: ServerActionResponseState | null,
  data: FormData
) {
  try {
    const tags = getAllTags()

    await new Promise(resolve => setTimeout(resolve, 1000))

    const formDataObject = formDataToObject(data)
    const updatedFormData = {
      ...formDataObject,
      content: xss(formDataObject.content),
      tags: formDataObject.tags.split(',').map((tag: string) => parseInt(tag))
    } as Omit<Post, 'created_at' | 'updated_at' | 'tags'> & {
      tags: number[]
    }

    postSchema.parse(updatedFormData)
    setPost({
      ...updatedFormData,
      tags: tags.filter(tag => updatedFormData.tags.includes(tag.id)),
      relatedPosts: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, +updatedFormData.id)

    revalidatePath(NavigationLinks.ADD_POST, 'layout')
    revalidatePath(NavigationLinks.EDIT_POST, 'layout')
    revalidatePath(NavigationLinks.HOME, 'layout')
    revalidatePath(`${NavigationLinks.POSTS}/${updatedFormData.slug}`, 'layout')

    return {
      status: SUCCESS_STATUS,
      message: `Post successfully created!`
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        status: ERROR_STATUS,
        message: 'Invalid form data',
        errors: err.issues.map(issue => ({
          path: issue.path.join('.'),
          message: `${issue.message}`
        }))
      }
    }
    return {
      status: ERROR_STATUS,
      message: GENERIC_ERROR_MESSAGE
    }
  }
}