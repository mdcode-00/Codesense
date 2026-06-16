import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getCodeReview = async(repo , prNumber , token) => {
  const response = await axios.post(`${BASE_URL}/api/review/`,{
    repo,
    prNumber,
    token
  })
  return response.data // return bug: [] , security: [], suggestions: []
}

export const getHistory = async() => {
  const response = await axios.get(`${BASE_URL}/api/review/`)
  return response.data
}