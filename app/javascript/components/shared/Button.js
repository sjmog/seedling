import React from 'react'
import { classNames } from 'utils'

const Button = ({ type, size, variant, Icon, onClick, children, ...props }) => {
  if(type === 'pill') return(
    <button
     type="button"
     className={classNames(
      "inline-flex items-center flex-shrink-0 rounded-full bg-white border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-500 cursor-pointer hover:bg-gray-100",
      "disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-normal disabled:hover:bg-white",
      props.className
     )}
     onClick={onClick}
     disabled={props.disabled}>
      { Icon && <Icon className="h-3 w-3 mr-1" /> }
      { children }
    </button>
  )

  const SIZE_TO_ICON_CLASSES = {
    xs: '-ml-0.5 mr-2 h-4 w-4',
    sm: '-ml-0.5 mr-2 h-4 w-4',
    md: '-ml-1 mr-2 h-5 w-5',
    lg: '-ml-1 mr-3 h-5 w-5',
    xl: '-ml-1 mr-3 h-5 w-5'
  }

  const SIZE_TO_BUTTON_CLASSES = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm leading-4',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base'
  }

  const VARIANT_TO_COLOR_CLASSES = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:hover:bg-indigo-300 disabled:cursor-default',
    secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500 disabled:bg-gray-50 disabled:hover:bg-gray-50 disabled:cursor-default'
  }

  if(type === 'link') return(
    <a
     href={props.href}
     onClick={onClick}
     download={props.download}
     disabled={props.disabled}
     target={props.target}
     className={classNames(
       "inline-flex flex-shrink-0 items-center rounded border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
       VARIANT_TO_COLOR_CLASSES[variant],
       SIZE_TO_BUTTON_CLASSES[size],
       props.className
     )}>

      {
        Icon &&
        <Icon
         className={classNames(
           "h-3 w-3 mr-1",
           SIZE_TO_ICON_CLASSES[size]
         )}
         aria-hidden="true" />
      }

      { children }
    </a>
  )

  return(
    <button
      type={type}
      onClick={onClick}
      disabled={props.disabled}
      className={classNames(
        "inline-flex flex-shrink-0 items-center rounded border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        VARIANT_TO_COLOR_CLASSES[variant],
        SIZE_TO_BUTTON_CLASSES[size],
        props.className
      )}>

      {
        Icon &&
        <Icon
         className={classNames(
           "h-3 w-3 mr-1",
           SIZE_TO_ICON_CLASSES[size]
         )}
         aria-hidden="true" />
      }

      { children }
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  size: 'md',
  variant: 'primary',
  disabled: false
}

export default Button
