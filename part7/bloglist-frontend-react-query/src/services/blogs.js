import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (id, blogData) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogData, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }
