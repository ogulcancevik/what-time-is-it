import { Time } from '../types/timezone.types'
import { api } from './api'

export const fetchMyTime = async () => {
  const { data } = await api.get<Time>('/ip')
  return data
}
export const fetchTimezone = async () => {
  const { data } = await api.get<string[]>('/timezone')
  return data
}

export const fetchTimezoneBySearch = async (timezone: string) => {
  const { data } = await api.get<Time>(`/timezone/${timezone}`)
  return data
}
