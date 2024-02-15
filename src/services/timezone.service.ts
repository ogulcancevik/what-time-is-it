import { api } from './api'

export const fetchTimezone = async () => {
  const { data } = await api.get<string[]>('/timezone')
  return data
}
