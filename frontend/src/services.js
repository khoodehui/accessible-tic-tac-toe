import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const createSession = async info => {
  const response = await axios.post(baseUrl, info)
  return response.data
}

const getAvailableSessions = async () => {
  const response = await axios.get(`${baseUrl}/available`)
  return response.data
}

const services = { createSession, getAvailableSessions }

export default services
