import TimeZoneSelectbox from './TimeZoneSelectbox'

const Header = () => {
  return (
    <div className="h-16 flex lg:flex-col lg:gap-5 items-center justify-between w-full px-20">
      <span className="text-xl bg-[#c35] p-5 lg:px-3 lg:text-base h-full text-white flex items-center justify-center">
        What time is it?
      </span>
      <TimeZoneSelectbox />
    </div>
  )
}

export default Header
