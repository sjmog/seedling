import React from 'react'
import { classNames } from 'utils'

const FlushList = ({ children, ...props }) => {
  return(
    <ul className={classNames(
      "list",
      props.bordered && 'divide-y divide-gray-200',
      props.rounded && 'rounded-md',
      props.className
     )}>
      { children }
    </ul>
  )
}

FlushList.Item = ({ children, ...props }) => {
  return(
    <li
     onMouseOver={props.onMouseOver}
     onClick={props.onClick}
     className={classNames(
      "flex py-4 px-6",
      props.hoverable && "hover:bg-gray-50 cursor-pointer",
      props.className
     )}>
      { children }
    </li>
  )
}

export default FlushList
