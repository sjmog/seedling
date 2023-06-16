import React, { useState } from "react"
import { StarIcon as EmptyStarIcon } from '@heroicons/react/24/outline'
import { StarIcon as FilledStarIcon } from '@heroicons/react/24/solid'

const RatingInput = ({ numberOfStars, initialValue, onClick }) => {
  const [value, setValue] = useState(initialValue)
  const [submitting, setSubmitting] = useState(false)

  const handleClick = (rating) => {
    setSubmitting(true)
    setValue(rating)
    onClick(rating)
  }

  const Star = (index) => {
    const Icon = value > index ? FilledStarIcon : EmptyStarIcon
    return(
      <Icon
       key={`star-${index}`}
       className="h-4 w-4 cursor-pointer"
       onMouseOver={() => setValue(index + 1)}
       onClick={() => handleClick(index + 1)} />
    )
  }

  return(
    <span
     className="flex space-x-1"
     onMouseLeave={() => !submitting && setValue(0)}>
      { [...Array(numberOfStars).keys()].map(Star) }
    </span>
  )
}

RatingInput.defaultProps = {
  initialValue: 0,
  numberOfStars: 5
}

export default RatingInput
