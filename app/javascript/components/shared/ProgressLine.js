import React from 'react'
import { classNames } from 'utils'

const ProgressLine = (props) => {
  return(
    <div
     className={classNames(
      'flow-root',
      props.className
    )}>
      { props.children }
    </div>
  )
}

ProgressLine.Widget = (props) => {
  return(
    <div className={classNames(
      'relative pb-8 flex',
      props.className
     )}>
      {
        !props.isLast &&
        <span 
         className="z-0 absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
         aria-hidden="true" />
      }
      { props.children }
    </div>
  )
}

ProgressLine.Widget.Indicator = (props) => {
  return(
    <div className={classNames(
       'z-10 rounded-full h-8 w-8 border-2 border-gray-300 bg-white mr-4 flex-shrink-0',
       props.filled && 'bg-indigo-400 border-indigo-400',
       props.active && 'border-indigo-600'
     )} />
  )
}

ProgressLine.Widget.Details = (props) => {
  return(
    <div className="flex mt-1.5 w-full justify-between">
      { props.children }
    </div>
  )
}

ProgressLine.Widget.Details.Header = (props) => {
  return(
    <div className="font-semibold text-sm">
      { props.children }
    </div>
  )
}

ProgressLine.Widget.Details.Action = (props) => {
  return(
    <div className="">
      { props.children }
    </div>
  )
}

export default ProgressLine