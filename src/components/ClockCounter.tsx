import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchMyTime,
  fetchTimezoneBySearch,
} from '../services/timezone.service'
import { useEffect, useState } from 'react'
import { format, increaseTime } from '../helpers/date'
import { useEventListener, useInterval } from 'usehooks-ts'
const ClockCounter = () => {
  const queryClient = useQueryClient()
  const { data: myTime, isLoading } = useQuery('myTime', fetchMyTime)
  const [clientTime, setClientTime] = useState<string>('')

  useEffect(() => {
    if (!myTime) return
    setClientTime(myTime.datetime)
    queryClient.setQueryData('clientTime', myTime.datetime)
  }, [myTime])

  const { data: selectedTimezone } = useQuery('selectedTimezone', () =>
    queryClient.getQueryData('selectedTimezone'),
  ) as { data: string }
  const updateTime = useMutation(fetchTimezoneBySearch, {
    onSuccess: (data) => {
      setClientTime(data.datetime)
      queryClient.setQueryData('clientTime', data.datetime)
    },
  })

  useEffect(() => {
    if (!selectedTimezone) {
      queryClient.setQueryData('selectedTimezone', myTime?.timezone)
      return
    }
    updateTime.mutate(selectedTimezone)
  }, [selectedTimezone])

  useInterval(() => {
    const newTime = increaseTime(clientTime)
    setClientTime(newTime)
  }, 1000)
  // @ts-ignore
  useEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      queryClient.invalidateQueries('myTime')
    }
  })
  return (
    <div className="text-[20vw] text-[#333333] font-extrabold clock">
      {isLoading ? 'Loading...' : format(clientTime, selectedTimezone)}
    </div>
  )
}

export default ClockCounter
