import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://worldtimeapi.org/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
