import React from 'react'
import { classNames } from 'utils'

// non-clickable pills (use Button#pill for clickable ones)
const Pill = (props) => {
  const COLOR_TO_BG_STYLES = {
    blue: 'bg-blue-50',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    default: 'bg-gray-100'
  }

  const COLOR_TO_TEXT_STYLES = {
    blue: 'text-blue-400',
    green: 'text-green-800',
    yellow: 'text-yellow-700',
    default: 'text-gray-500'
  }

  const bgStyles = COLOR_TO_BG_STYLES[props.color] || COLOR_TO_BG_STYLES.default
  const textStyles = COLOR_TO_TEXT_STYLES[props.color] || COLOR_TO_TEXT_STYLES.default

  const Icon = props.Icon

  return(
    <div
      className={classNames(
      "inline-flex items-center flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
      bgStyles,
      textStyles,
      props.className
     )}>
      { Icon && <Icon className="h-3 w-3 mr-1" /> }
      { props.children }
   </div>
  )
}

export default Pill
