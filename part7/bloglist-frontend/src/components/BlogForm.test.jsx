import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"
import { expect } from "vitest"

describe('<BlogForm />', () => {
  test('', async () => {

    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()
    const createButton = screen.getByText('Create')

    const titleInput = screen.getByPlaceholderText('enter title')
    const authorInput = screen.getByPlaceholderText('enter author name')
    const urlInput = screen.getByPlaceholderText('enter url')
    await user.type(titleInput, 'learn react')
    await user.type(authorInput, 'ram')
    await user.type(urlInput, 'https://myblogs.com/')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('learn react')
    expect(createBlog.mock.calls[0][0].author).toBe('ram')
    expect(createBlog.mock.calls[0][0].url).toBe('https://myblogs.com/')

  })
})
