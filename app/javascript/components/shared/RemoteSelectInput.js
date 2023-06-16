import React, { Fragment, useEffect, useState } from 'react'
import useFetch from 'hooks/useFetch'
import usePut from 'hooks/usePut'
import useFlash from 'hooks/useFlash'
import { SelectInput, Spinner } from 'components/shared'

const RemoteSelectInput = ({ title, fetchPath, updatePath, updateTransform, defaultValue, optionValue, optionLabel, defaultOption, ...props }) => {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(0)
  const { successFlash } = useFlash()

  useFetch(fetchPath, setOptions, [])
  useFetch(fetchPath, setOptions, [defaultValue])

  const { put, data } = usePut(() => {
    successFlash(`Successfully updated${ title ? ` ${ title }.` : '.' }`)

    if(props.onSubmit) props.onSubmit()
  })

  useEffect(() => {
    if(options && options.length > 0 && defaultValue) {
      setSelected(defaultValue)
    } else {
      setSelected(0)
    }
  }, [options, defaultValue])

  const handleChange = (e) => {
    setSelected(e.target.value)
    if(props.onChange) props.onChange(e)
    if(updatePath) put(updatePath, updateTransform(e))
  }

  return(
    <div className="flex space-x-2">
      <SelectInput
       onChange={handleChange}
       // defaultValue={selected}
       value={selected}
       className="w-64">
        {
          defaultOption &&
          <option
           value="0"
           disabled>{ defaultOption }</option>
        }

        {
          options.map(option => (
            <option
             key={option[optionValue]}
             value={option[optionValue]}>{option[optionLabel]}</option>
          ))
        }
      </SelectInput>
      { data.isLoading && <Spinner /> }
    </div>
  )
}

export default RemoteSelectInput
