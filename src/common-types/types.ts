import { ERROR_STATUS, Language, SUCCESS_STATUS } from '@/constant'

export type ServerSideComponentProps<Params, SearchParams = undefined> = {
  params: Params
  searchParams: SearchParams
}

export interface Post {
  id: number
  author_id: number
  title: string
  slug: string
  content: string
  summary: string
  featured_image: string
  featured_image_description: string
  featured_image_credit: string
  meta_title: string
  meta_description: string
  created_at: string // ISO 8601 string
  updated_at: string // ISO 8601 string
  tags: Tag[]
  featured: boolean
  language: Language
  relatedPosts: number[]
}

export interface Tag {
  id: number
  name: string
}

export type ServerActionResponseState =
  | {
      status: typeof SUCCESS_STATUS
      message: string
    }
  | {
      status: typeof ERROR_STATUS
      message: string
      errors?: {
        path: string
        message: string
      }[]
    }