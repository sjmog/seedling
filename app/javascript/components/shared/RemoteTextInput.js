import React, { useState, useEffect, useRef } from 'react'
import { TextInput, Spinner } from 'components/shared'
import usePut from 'hooks/usePut'
import usePost from 'hooks/usePost'
import useMetaEnter from 'hooks/useMetaEnter'
import useFlash from 'hooks/useFlash'
import { classNames } from 'utils'

const RemoteTextInput = ({ title, name, label, defaultValue, placeholder, method, path, transform, LeadingIcon, ...props }) => {
  const [text, setText] = useState(defaultValue)
  const [isFocussed, setIsFocussed] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    setText(defaultValue)
    textInputRef.current.value = defaultValue
  }, [defaultValue])

  const textInputRef = useRef()

  const { successFlash, errorFlash } = useFlash()

  let request, submit, data

  switch (method) {
  case 'put':
    request = usePut(() => {
      successFlash(`Successfully updated${ title ? ` ${ title }.` : '.' }`)
      setIsFocussed(false)
      setIsChanged(false)
      textInputRef.current.blur()

      if(props.onSubmit) props.onSubmit(text)
    })

    submit = request.put
    data = request.data

    break
  case 'post':
    request = usePost(() => {
      successFlash(`Successfully created ${ title ? ` ${ title }.` : '.' }`)
      setIsFocussed(false)
      setIsChanged(false)
      textInputRef.current.blur()

      if(props.onSubmit) props.onSubmit(text)
    })

    submit = request.post
    data = request.data

    break
  }

  const handleChange = (e) => {
    setIsChanged(true)
    setText(e.target.value)

    if(props.onChange) props.onChange(e)
  }

  const handleSubmit = () => {
    submit(path, transform(text))
  }

  const { metaKey, handleMetaEnter } = useMetaEnter(handleSubmit)

  return(
    <div className={classNames("flex w-full max-w-sm items-center relative", props.className)}>
      {
        LeadingIcon &&
        <div className="z-10 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <LeadingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      }

      <TextInput
       ref={textInputRef}
       name={name}
       label={label}
       defaultValue={defaultValue}
       placeholder={placeholder}
       onChange={handleChange}
       onKeyDown={handleMetaEnter}
       onClick={(e) => { e.stopPropagation() }}
       onFocus={() => setIsFocussed(true)}
       onBlur={() => setIsFocussed(false)}
       className='flex-1'
       inputClassName={classNames(
        LeadingIcon && 'pl-10',
        (isFocussed || isChanged) && 'pr-24',
        props.inputClassName
       )} />

      {
        (isFocussed || isChanged) &&
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-xs font-medium text-gray-400">
            {
              data.isLoading
              ? 'Submitting...'
              : `${ metaKey } + Enter`
            }
          </kbd>
        </div>
      }
    </div>
  )
}

RemoteTextInput.defaultProps = {
  defaultValue: ''
}

export default RemoteTextInput
