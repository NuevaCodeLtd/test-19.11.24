export const APP_NAME = 'Blog About English'
export const SUCCESS_STATUS = 'success' as const
export const ERROR_STATUS = 'error' as const
export const WARNING_STATUS = 'warning' as const
export const INFO_STATUS = 'info' as const
export const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.'
export type Language = 'en' | 'de' | 'fr'
export const AVERAGE_READING_SPEED = 200 // words per minute
export enum NavigationLinks {
  HOME = '/',
  POSTS = '/posts',
  TAGS = '/tags',
  ADD_POST = '/add-post',
  EDIT_POST = '/edit-post'
}
