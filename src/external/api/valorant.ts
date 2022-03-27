import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VALORANT_API_HOST,
  headers: {
    'X-Riot-Token': process.env.VALORANT_API_TOKEN,
  },
})

export default api
