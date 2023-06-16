import React from 'react'
import { classNames } from 'utils'

const Indicator = (props) => {
  const TYPE_TO_COLOR = {
    success: 'bg-green-400',
    loading: 'bg-gray-200',
    notification: 'bg-red-400'
  }
  return(
    <div
     className={classNames(
      "h-2 w-2 rounded-full",
      TYPE_TO_COLOR[props.type],
      props.pulse && 'animate-pulse',
      props.className
     )} />
  )
}

Indicator.defaultProps = {
  type: 'success'
}

export default Indicator
