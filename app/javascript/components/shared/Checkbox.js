import React from 'react'
import { classNames } from 'utils'

const Checkbox = ({ id, describedBy, name, checked, ...props }) => {
  const SIZE_TO_CLASSES = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  }

  return(
    <input
     className={classNames(
      "rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500",
      props.disabled && "cursor-not-allowed",
      SIZE_TO_CLASSES[props.size],
      props.className
     )}
     id={id}
     aria-describedby={describedBy}
     name={name}
     disabled={props.disabled}
     checked={props.readOnly ? checked : null}
     readOnly={props.readOnly}
     onClick={props.onClick}
     type="checkbox" />
  )
}

Checkbox.defaultProps = {
  size: 'md',
}

export default Checkbox