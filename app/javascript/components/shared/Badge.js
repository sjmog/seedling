import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from 'utils'

const Badge = ({ color, size, children, ...props }) => {
  const SIZE_TO_CLASSES = {
    sm: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-0.5 text-sm'
  }

  const COLOR_TO_BGS = {
    gray: 'bg-gray-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    indigo: 'bg-indigo-100',
    purple: 'bg-purple-100',
    pink: 'bg-pink-100'
  }

  const COLOR_TO_TEXT_COLORS = {
    gray: 'text-gray-800',
    red: 'text-red-800',
    yellow: 'text-yellow-800',
    green: 'text-green-800',
    blue: 'text-blue-800',
    indigo: 'text-indigo-800',
    purple: 'text-purple-800',
    pink: 'text-pink-800'
  }

  const sizeClasses = SIZE_TO_CLASSES[size]
  const bgColorClasses = COLOR_TO_BGS[color]
  const textColorClasses = COLOR_TO_TEXT_COLORS[color]

  return(
    <span
     className={classNames(
      "inline-flex items-center rounded-full bg-gray-100 font-medium text-gray-800 flex-shrink-0",
      sizeClasses,
      bgColorClasses,
      sizeClasses,
      props.className
     )}
     onClick={props.onClick}>
      {
        props.dismissible &&
        <XMarkIcon
         className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-pointer"
         onClick={props.onClick} />
      }
      { children }
    </span>
  )
}

Badge.defaultProps = {
  size: 'sm',
  color: 'gray'
}

export default Badge
