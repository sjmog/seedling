import React from 'react'
import { classNames } from 'utils'

const LabelHeader = (props) => {
  return(
    <div className={classNames("text-gray-400 font-semibold text-sm @xs:hidden @sm:block", props.className)}>
      { props.children }
    </div>
  )
}

export default LabelHeader
