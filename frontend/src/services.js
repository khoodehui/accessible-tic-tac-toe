import axios from 'axios'

const baseUrl = '/'

const createSession = async info => {
  const response = await axios.post(baseUrl, info)
  return response.data
}

const services = { createSession }

export default services
