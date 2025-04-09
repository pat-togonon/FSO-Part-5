import { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create a new blog</h2>
        <div>
          title: <input placeholder="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          author: <input placeholder="author" name="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          url: <input placeholder="url" name="url" value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog