import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = async (user, title, author, url) => {
  try {
    const config = {
      headers: { Authorization: `bearer ${user.token}` }
    }
    return await axios.post(baseUrl, { title, author, url }, config)
  } catch (err) {
    console.error(err.response.data.error)
  }
}

export default { getAll, newBlog }