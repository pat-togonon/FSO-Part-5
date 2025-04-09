import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.post(baseUrl, newBlog, config)
  return response
}

const updateLike = (updatedBlog, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response

}

const getOne = (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.get(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, setToken, create, updateLike, getOne, deleteBlog }