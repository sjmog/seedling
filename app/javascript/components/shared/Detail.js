import React from 'react'
import { Hint } from 'components/shared'
import { classNames } from 'utils'

const Detail = ({ title, defaultValue, children, className }) => {
  return(
    <div className={classNames("sm:col-span-1", className)}>
      <dt className="text-sm font-medium text-gray-500">{ title }</dt>
      <dd className="mt-1 text-sm text-gray-900">
        {
          children
          ? children
          : <Hint>{defaultValue}</Hint>
        }
      </dd>
    </div>
  )
}

Detail.defaultProps = {
  defaultValue: 'Not given'
}

export default Detail
