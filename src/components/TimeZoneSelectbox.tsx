import { useQuery, useQueryClient } from 'react-query'
import { fetchTimezone } from '../services/timezone.service'
import { useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'

const TimeZoneSelectbox = () => {
  const queryClient = useQueryClient()
  const { data: timezones, isLoading } = useQuery('timezone', fetchTimezone)
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const filteredData = useMemo(() => {
    if (!timezones) return []
    return timezones.filter((timezone) =>
      timezone.toLowerCase().includes(search.toLowerCase()),
    )
  }, [timezones, search])
  const handleSelectTimezone = (timezone: string) => {
    const input = document.querySelector('#timezone') as HTMLInputElement
    input.value = timezone
    queryClient.setQueryData('selectedTimezone', timezone)
    setIsOpen(false)
  }

  const handleFocus = () => {
    setSearch('')
    const input = document.querySelector('#timezone') as HTMLInputElement
    input.value = ''
  }
  const dropdownRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const formatedTimezone = useCallback(
    (timezone: string) => {
      return timezone.split('/')[0] + ' ' + timezone.split('/')[1]
    },
    [timezones],
  )

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search timezone"
        className="w-72 lg:w-56 lg:text-sm p-2 border-gray-300 rounded-md border focus:outline-none bg-neutral-100"
        onClick={() => setIsOpen(true)}
        onFocus={handleFocus}
        id="timezone"
        onChange={(e) => setSearch(e.target.value)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bg-white border border-gray-300 max-h-56 overflow-auto rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {!isLoading &&
              filteredData?.map((timezone) => (
                <div
                  key={timezone}
                  ref={dropdownRef}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer w-72 lg:w-56 lg:text-sm"
                  onClick={() => handleSelectTimezone(timezone)}
                >
                  <span>{formatedTimezone(timezone)}</span>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TimeZoneSelectbox
