import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('the form calls the event handler it received as props with the right details when creating a new blog', async () => {

  const newBlogHandler = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlog createBlog={newBlogHandler} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'How to study well testing')
  await user.type(authorInput, 'Patricia Togonon')
  await user.type(urlInput, 'studyingwell.com')
  
  await user.click(createButton)

  expect(newBlogHandler.mock.calls).toHaveLength(1)
  expect(newBlogHandler.mock.calls[0][0].title).toBe('How to study well testing')
  expect(newBlogHandler.mock.calls[0][0].author).toBe('Patricia Togonon')
  expect(newBlogHandler.mock.calls[0][0].url).toBe('studyingwell.com')

})