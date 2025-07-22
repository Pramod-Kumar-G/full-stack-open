import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'


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

})
