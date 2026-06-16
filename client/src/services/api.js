import axios from 'axios'

export const getCodeReview = async(repo , prNumber , token) => {
  const response = await axios.post('http://localhost:4000/api/review/',{
    repo,
    prNumber,
    token
  })
  return response.data // return bug: [] , security: [], suggestions: []
}

export const getHistory = async() => {
  const response = await axios.get('http://localhost:4000/api/review/')
  return response.data
}