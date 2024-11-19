import React from 'react'
import { render, screen } from '@testing-library/react'
import PostContent from '../src/components/post-item/post-content'
import { getRelatedPosts } from '@/lib/post-utils'
import { Post } from '@/common-types/types'

jest.mock('../src/lib/post-utils', () => ({
  calculateReadTime: jest.fn(),
  getRelatedPosts: jest.fn()
}))
const calculateReadTimeMock = require('../src/lib/post-utils').calculateReadTime
const getRelatedPostsMock = require('../src/lib/post-utils').getRelatedPosts
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}))

describe('PostContent Component', () => {
  const mockContent = {
    id: 1,
    author_id: 101,
    title: 'Top Trends in Mobile App Development for 2024',
    slug: 'top-trends-mobile-app-development-2024',
    content:
      "<p>Mobile app development is evolving at a rapid pace, with new technologies like AI and machine learning reshaping the landscape. These trends are expected to have a significant impact on the way apps are built, deployed, and interacted with by users.</p><p>For 2024, we foresee some key trends that every developer should keep an eye on:</p><ul><li>AI integration for personalized user experiences</li><li>Progressive Web Apps (PWAs) gaining traction</li><li>5G enabling faster, more immersive apps</li></ul><p>To stay ahead of the competition, it's crucial to adopt these trends and keep your development strategies flexible.</p>",
    summary: 'Discover the top mobile app development trends for 2024.',
    featured_image: 'https://placehold.co/600x400?text=Post+1',
    featured_image_description: 'Trends in mobile development.',
    featured_image_credit: 'Photo by Unsplash',
    meta_title: 'Top Trends in Mobile App Development for 2024',
    meta_description:
      'A look at the key trends that will shape mobile app development in 2024.',
    created_at: '2024-10-21T00:00:00',
    updated_at: '2024-10-21T09:00:00',
    featured: false,
    language: 'en',
    tags: [
      { id: 1, name: 'mobile_development' },
      { id: 2, name: 'app_trends', article_id: 1 }
    ],
    relatedPosts: [2]
  } as Post
  const mockRelatedPost = {
    id: 2,
    author_id: 102,
    title: 'How AI is Revolutionizing Product Design',
    slug: 'ai-revolutionizing-product-design',
    content: '<p>Lorem ipsum</p>',
    summary:
      'Explore how AI tools are transforming the field of product design.',
    featured_image: 'https://placehold.co/600x400?text=Post+2',
    featured_image_description: 'AI in product design.',
    featured_image_credit: 'Photo by Unsplash',
    meta_title: 'How AI is Revolutionizing Product Design',
    meta_description:
      'A deep dive into the impact of AI on modern product design.',
    created_at: '2024-10-18T00:00:00',
    updated_at: '2024-10-19T09:00:00',
    featured: false,
    language: 'en',
    tags: [
      { id: 3, name: 'artificial_intelligence' },
      { id: 4, name: 'product_design', article_id: 2 }
    ],
    relatedPosts: []
  } as Post

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    calculateReadTimeMock.mockReturnValue(5)
    getRelatedPostsMock.mockReturnValue(mockRelatedPost)

    const { asFragment } = render(<PostContent content={mockContent} relatedPosts={[mockRelatedPost]} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with content', async () => {
    calculateReadTimeMock.mockReturnValue(5)
    getRelatedPostsMock.mockReturnValue([mockRelatedPost])

    render(<PostContent content={mockContent} relatedPosts={[mockRelatedPost]} />)

    expect(screen.getByText(mockContent.title)).toBeInTheDocument()

    expect(screen.getByText('Related Posts')).toBeInTheDocument()
    expect(
      screen.getByText('You might also be interested in:')
    ).toBeInTheDocument()
  })

  it('does not render anything if content is null', () => {
    const { container } = render(<PostContent content={null} relatedPosts={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders related posts if available', () => {
    getRelatedPostsMock.mockReturnValue(mockRelatedPost)

    render(<PostContent content={mockContent} relatedPosts={[mockRelatedPost]} />)

    expect(getRelatedPosts).toHaveBeenCalledWith(mockContent.relatedPosts)
  })

  it('does not render related posts if none are available', () => {
    getRelatedPostsMock.mockReturnValue([])

    const noRelatedContent = { ...mockContent, relatedPosts: [] }

    render(<PostContent content={noRelatedContent} relatedPosts={[]} />)

    expect(screen.queryByText('Related Posts')).not.toBeInTheDocument()
  })
})