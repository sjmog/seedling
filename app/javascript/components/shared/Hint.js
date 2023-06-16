import React from 'react'
import { classNames } from 'utils'

const Hint = ({ children, className, center, big, small, tiny }) => {
  return(
    <div
     className={classNames(
      "text-sm text-gray-400 font-normal",
      center && 'text-center',
      tiny || small && 'text-xs',
      big && 'text-base',
      className)}>
      {children}
    </div>
  )
}

Hint.defaultProps = {
  center: false,
  tiny: false
}

export default Hint