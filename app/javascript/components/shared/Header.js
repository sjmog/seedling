import React from 'react'

const Header = ({ children }) => {
  return(
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-2">
          { children }
        </h2>
      </div>
    </div>
  )
}

export default Header
