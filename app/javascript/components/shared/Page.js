import React from 'react'
import { classNames } from 'utils'

const Page = ({ children, className, ...props }) => {
  return(
    <div
     className={classNames(
      "absolute inset-0 bg-white overflow-auto",
      props.fullscreen && "overflow-hidden",
      props.noNavigation ? '' : 'lg:left-20',
      className
     )}>
      { children }
    </div>
  )
}

export default Page