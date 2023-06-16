import React from 'react'
import { classNames } from 'utils'

const Card = (props) => {
  return(
    <div
      onClick={props.onClick}
      className={classNames(
        "relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400 cursor-pointer"
      )}>
    { props.children }
   </div>
  )
}

export default Card
