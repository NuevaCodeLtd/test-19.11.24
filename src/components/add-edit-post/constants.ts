import { Language } from '@/constant'

export const addEditPostFormDefaultValues = {
  title: '',
  slug: '',
  content: '',
  summary: '',
  featured_image: '',
  featured_image_description: '',
  featured_image_credit: '',
  meta_title: '',
  meta_description: '',
  tags: [],
  featured: false,
  language: 'en' as Language,
  relatedPosts: []
}
