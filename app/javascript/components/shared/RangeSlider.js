import React, { useState } from 'react'
import Slider from 'react-rangeslider'

const RangeSlider = (props) => {
  const [value, setValue] = useState(props.initialValue)

  const handleChange = (val) => {
    if(props.disabled) return

    setValue(val)
    if(props.onChange) props.onChange(val)
  }

  const handleChangeComplete = (e) => {
    if(props.disabled) return

    if(props.onChangeComplete) props.onChangeComplete(value)
  }

  return(
    <Slider
     className={props.disabled ? 'Slider--disabled' : ''}
     min={props.min}
     max={props.max}
     disabled={props.disabled}
     labels={props.labels}
     onChange={handleChange}
     onChangeComplete={handleChangeComplete}
     value={value} />
  )
}

RangeSlider.defaultProps = {
  min: 0,
  max: 5,
  initialValue: 0,
  disabled: false
}

export default RangeSlider
