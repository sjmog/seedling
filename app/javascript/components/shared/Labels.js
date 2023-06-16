import React from 'react'
import { Badge } from 'components/shared'
import { classNames } from 'utils'

const Labels = ({ labels, ...props }) => {
  return(
    <span className={classNames("space-x-1 space-y-1", props.className)}>
      {
        labels.map(label =>
          <Badge
           key={label.id}
           dismissible={props.dismissible}
           onClick={() => props.onClick(label.id)}>
           {label.text}
          </Badge>
        )
      }
    </span>
  )
}

Labels.defaultProps = {
  labels: []
}

export default Labels
