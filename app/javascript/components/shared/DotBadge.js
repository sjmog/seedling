import React from 'react'
import { classNames } from 'utils'

const DotBadge = ({ value, ...props }) => {
  return(
    <div
     className={classNames(
      'absolute -top-2 -right-2 rounded-full h-5 w-5 bg-red-400 flex items-center justify-center text-xs font-semibold text-white',
      props.className
     )}>
      { value }
    </div>
  )
}

export default DotBadge
