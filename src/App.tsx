import TimeZoneSelectbox from './components/TimeZoneSelectbox'
import { useQuery, useQueryClient } from 'react-query'

const App = () => {
  const queryClient = useQueryClient()
  const { data: selectedTimezone } = useQuery('selectedTimezone', () =>
    queryClient.getQueryData('selectedTimezone'),
  ) as { data: string }
  return (
    <div>
      <TimeZoneSelectbox />
      {selectedTimezone && selectedTimezone}
    </div>
  )
}

export default App
