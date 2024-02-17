import { useQuery, useQueryClient } from 'react-query'
import { formatDateToDay } from '../helpers/date'

const DayDetails = () => {
  const queryClient = useQueryClient()
  const { data } = useQuery('clientTime', () =>
    queryClient.getQueryData('clientTime'),
  ) as { data: string }
  const { data: selectedTimezone } = useQuery('selectedTimezone', () =>
    queryClient.getQueryData('selectedTimezone'),
  ) as { data: string }
  const fullDate = formatDateToDay(data, selectedTimezone).split(' ')
  const [day, month, year, dayName] = fullDate
  return (
    <div className="text-[#333] text-3xl lg:text-xl font-light flex justify-end lg:justify-center">
      {day} {month} {year}, {dayName}
    </div>
  )
}

export default DayDetails
