import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'


describe('<Blog />', () => {

  test('displays only title and author by default and not likes and url', () => {
    const blog = {
      title: 'Learn React',
      author: 'Saik',
      likes: 3,
      url: 'medium.com',
      user: {
        name: 'Rambo',
        username: 'rambo'
      }
    }
    const user = { username: 'rambo' }
    const container = render(<Blog blog={blog} user={user} />).container

    const blogDetails = screen.getByText('Learn React Saik')
    expect(blogDetails).toBeDefined()

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).toHaveStyle({ display: 'none' })
  })

  test('displays likes and url when view is clicked', async () => {
    const blog = {
      title: 'Learn React',
      author: 'Saik',
      likes: 3,
      url: 'medium.com',
      user: {
        name: 'Rambo',
        username: 'rambo'
      }
    }
    const userObject = { username: 'rambo' }
    const container = render(<Blog blog={blog} user={userObject} />).container

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    await user.click(viewButton)

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).not.toHaveStyle({ display: 'none' })
  })

  test('handleUpdate is called twice when the like button is clicked twice', async () => {
    const blog = {
      title: 'Learn React',
      author: 'Saik',
      likes: 3,
      url: 'medium.com',
      user: {
        name: 'Rambo',
        username: 'rambo'
      }
    }
    const userObject = { username: 'rambo' }
    const updateLikes = vi.fn()
    render(<Blog blog={blog} handleUpdate={updateLikes} user={userObject} />)

    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateLikes.mock.calls).toHaveLength(2)

  })

})
