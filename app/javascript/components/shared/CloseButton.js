import React from 'react'
import { XIcon } from '@heroicons/react/outline'

const CloseButton = ({ onClick }) => {
  return(
    <XIcon
     className="h-5 w-5 cursor-pointer text-gray-300 hover:text-gray-500 focus:text-gray-700"
     onClick={onClick} />
  )
}

export default CloseButton