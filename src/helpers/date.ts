import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(tz)

export const format = (time: string, timezone: string) => {
  return dayjs(time).tz(timezone).format('HH:mm:ss')
}

export const formatDateToDay = (time: string, timezone: string) => {
  return dayjs(time).tz(timezone).format('DD MMMM YYYY dddd')
}

export const increaseTime = (time: string) => {
  const newTime = dayjs(time).add(1, 'second').toISOString()
  return newTime
}
