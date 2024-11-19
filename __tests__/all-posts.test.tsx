import { render, screen, fireEvent } from '@testing-library/react'
import AllPosts from '../src/components/all-posts'
import { useRouter, usePathname } from 'next/navigation'
import { getAllPosts } from '../src/lib/post-utils'
import {NavigationLinks} from '@/constant';

global.structuredClone = val => JSON.parse(JSON.stringify(val))

jest.mock('../src/components/posts-grid', () => {
  return jest.fn(() => <div>PostsGrid Mock</div>)
})

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}))

const mockPush = jest.fn()

describe('AllPosts', () => {
  const postsData = getAllPosts(1)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(usePathname as jest.Mock).mockReturnValue(NavigationLinks.POSTS)
  })

  it('should match snapshot', () => {
    const mockPostsData = structuredClone(postsData)

    const { asFragment } = render(<AllPosts postsData={mockPostsData} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the AllPosts component with posts and pagination', () => {
    const mockPostsData = structuredClone(postsData)

    render(<AllPosts postsData={mockPostsData} />)

    expect(screen.getByText('Welcome to blog posts')).toBeInTheDocument()
    expect(screen.getByText('PostsGrid Mock')).toBeInTheDocument()
    expect(screen.getByText('Page: 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /page 2/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /page 3/i })).toBeInTheDocument()
  })

  it('renders without pagination if there is only one page', () => {
    const mockPostsData = {
      ...structuredClone(postsData),
      totalPages: 1
    }

    render(<AllPosts postsData={mockPostsData} />)

    expect(screen.getByText('Welcome to blog posts')).toBeInTheDocument()
    expect(screen.getByText('PostsGrid Mock')).toBeInTheDocument()
    expect(screen.queryByText('Page: 1')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument() // No pagination buttons
  })

  it('handles pagination change correctly', () => {
    const mockPostsData = structuredClone(postsData)

    // Act
    render(<AllPosts postsData={mockPostsData} />)

    const pageButton = screen.getByRole('button', { name: /page 2/i })
    fireEvent.click(pageButton)

    expect(mockPush).toHaveBeenCalledWith('/posts/?page=2', undefined)
  })
})