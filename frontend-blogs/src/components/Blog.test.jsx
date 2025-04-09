import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  let container

  const blog = {
    title: 'How to study well testing',
    author: 'Patricia Togonon',
    url: 'studyingwell.com',
    likes: 12,
    user: {
        username: 'pat'
    }
  }

  const user = {
    username: 'pat'
  }

  const handleLikes = vi.fn()
    
  beforeEach(() => {
    container = render(
    <Blog blog={blog} user={user} updateLike={handleLikes} />        
    ).container
  })

  test('renders blog title and author', () => {
  
    const authorElement = screen.getByText('Patricia Togonon', { exact: false })

    const titleElement = screen.getByText('How to study well testing', { exact: false })

    expect(authorElement).toBeDefined()
    expect(titleElement).toBeDefined()

  })

  test('does not render url or number of likes by default', () => {
    
    const div = container.querySelector('.contentToShow') 
    expect(div).toHaveStyle('display: none')

  })

  test('blog URL and likes are shown when button is clicked', async () => {

    const userAction = userEvent.setup()
    const button = screen.getByText("view")
    await userAction.click(button)

    const urlElement = screen.getByText('studyingwell.com')
    const likesElement = screen.getByText('12', { exact: false })

    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()

    const div = container.querySelector('.contentToShow')
    expect(div).not.toHaveStyle('display: none')

  })

  test('if like button is clicked twice, event handler it receives as props is called twice', async () => {
    
    const userAction = userEvent.setup()
    const button = screen.getByText('like')

    await userAction.click(button)
    await userAction.click(button)
    expect(handleLikes.mock.calls).toHaveLength(2)
   
  })
})