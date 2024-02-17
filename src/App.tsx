import { useQuery, useQueryClient } from 'react-query'
import ClockCounter from './components/ClockCounter'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import DayDetails from './components/DayDetails'

const App = () => {
  const queryClient = useQueryClient()
  const { data: selectedTimezone } = useQuery('selectedTimezone', () =>
    queryClient.getQueryData('selectedTimezone'),
  ) as { data: string }
  const [zone, setZone] = useState<string>('')
  useEffect(() => {
    if (selectedTimezone) {
      const [city, zone] = selectedTimezone.split('/')
      setZone(city + ', ' + zone)
    }
  }, [selectedTimezone])
  return (
    <div className="flex flex-col items-center bg-neutral-50 h-screen">
      <Header />
      <div className="mt-20">
        <div className="text-3xl lg:text-xl lg:text-center text-[#333333]">
          What time is it in <span className="font-bold">{zone}</span>
        </div>
        <ClockCounter />
        <DayDetails />
      </div>
    </div>
  )
}

export default App
