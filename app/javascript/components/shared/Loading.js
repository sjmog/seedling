import React from 'react'
import { Spinner } from 'components/shared'
import { classNames } from 'utils'

const Loading = ({ message, ...props }) =>  {
  return(
    <div className={classNames("absolute inset-0 flex items-center justify-center min-h-20", props.className)}>
      <Spinner className="text-gray-400" />
      <span className="sr-only">Loading</span>
      {
        message &&
        <div className="text-gray-400 ml-2">{message}</div>
      }
    </div>
  )
}

export default Loading