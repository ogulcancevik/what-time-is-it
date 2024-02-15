import { useQuery, useQueryClient } from 'react-query'
import { fetchTimezone } from '../services/timezone.service'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TimeZoneSelectbox = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery('timezone', fetchTimezone)
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState('')
  const filteredData = useMemo(() => {
    if (!data) return []
    return data.filter((timezone) =>
      timezone.toLowerCase().includes(search.toLowerCase()),
    )
  }, [data, search])
  const handleSelectTimezone = (timezone: string) => {
    setSelectedTimezone(timezone)
    queryClient.setQueryData('selectedTimezone', timezone)
    setIsOpen(false)
  }
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search timezone"
        className="w-64 p-2 border-gray-300 rounded-md border focus:border-blue-500 focus:outline-none"
        value={selectedTimezone}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bg-white border border-gray-300 w-64 max-h-64 overflow-auto rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {!isLoading &&
              filteredData?.map((timezone) => (
                <div
                  key={timezone}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectTimezone(timezone)}
                >
                  <span>{timezone}</span>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TimeZoneSelectbox
