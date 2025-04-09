import { useState } from 'react'
import PropTypes from 'prop-types'
import ErrorNotification from './ErrorNotification'
import Notification from './Notification'

const Blog = ({ blog, user, updateLike, deleteBlog, fetchBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [like, setLike] = useState(blog.likes)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)


  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: 18
  }

  const detailsToggle = () => {
    setShowDetails(!showDetails)
  }

  const showDetailsWhenViewed = {
    display: showDetails ? '' : 'none'
  }

  const hideDetails = {
    display: showDetails ? 'none' : ''
  }

  const buttonLabel = showDetails ? 'hide' : 'view'

  const handleViewHideButton = () => {
    detailsToggle()
    showDetails ? showDetailsWhenViewed : hideDetails
    
  }
  
  const handleLikes = () => {

    const updatedBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
   
    updateLike(updatedBlog, blog.id)
    setLike(like + 1)

  }

  const handleDelete = () => {
    let isConfirmed = window.confirm(`Delete ${blog.title} by ${blog.author}?`)

    if (isConfirmed) {
      
     try {
      deleteBlog(blog.id)
      fetchBlogs      
     } catch {
        setErrorMessage('Failed to delete. Please try again')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
     }
    } else {
      setNotification('Blog deletion is cancelled')
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }

  }
  const isSameUser = (user.username === blog.user.username) 

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p><strong>{blog.title}</strong> {blog.author} <button onClick={handleViewHideButton}>{buttonLabel}</button></p>
      </div>
      <div style={showDetailsWhenViewed} className="contentToShow">
        <p>{blog.url}</p>
        <ErrorNotification message={errorMessage} />
        <Notification message={notification} />
        <p>likes: {like} <button onClick={handleLikes}>like</button></p>
        <p>Added by: {blog.user.name}</p>
        <div>
          {isSameUser && <button onClick={handleDelete}>delete blog</button>}
        </div>
      </div>

    </div>
  )
}


export default Blog