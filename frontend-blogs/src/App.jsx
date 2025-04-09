import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/login'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Invalid login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Login
          header="login to blog list application"
          onSubmit={handleLogin}
          username={username}
          password={password}
          onChangeUsername={({ target }) => setUsername(target.value)} onChangePassword={({ target }) => setPassword(target.value)} />
      </div>
    )
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }
  const handleBlogCreation = (newBlog) => {
    blogService.setToken(user.token)

    blogCreationFormRef.current.toggleVisibility()

    blogService
      .create(newBlog)
      .then(response => {
        const savedBlog = response.data
        setBlogs(blogs.concat(savedBlog))
        fetchBlogs()
        setNotification(`${savedBlog.title} by ${savedBlog.author} is added in successfully`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogsBlock = () => {

    return (
      <div>
        <h2>blogs list</h2>
        {(blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} updateLike={blogService.updateLike} deleteBlog={blogService.deleteBlog} fetchBlogs={fetchBlogs()}/>
        ))}
      </div>
    )
  }

  const blogCreationFormRef = useRef()

  const blogCreationForm = () => {
    return (
      <Togglable buttonLabel="create a new blog" ref={blogCreationFormRef}>
        <CreateBlog createBlog={handleBlogCreation} />
      </Togglable>
    )
  }

  const createAndList = () => {
    
    return (
      <div>
        <h2>blog application</h2>
        <div>
          {user.name} logged-in <button onClick={handleLogout}>logout</button>
        </div>
        {blogCreationForm()}
        {fetchBlogs()}        
        {blogsBlock()}
      </div>
    )
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={notification} />
      {user === null ?
        loginForm()
        : createAndList()
      }

    </div>
  )
}

export default App