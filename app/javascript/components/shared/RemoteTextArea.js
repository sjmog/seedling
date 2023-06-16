import React, { useState, useEffect, useRef } from 'react'
import { TextArea, Button } from 'components/shared'
import useFlash from 'hooks/useFlash'
import useMetaEnter from 'hooks/useMetaEnter'
import usePost from 'hooks/usePost'
import usePut from 'hooks/usePut'
import { classNames } from 'utils'

const RemoteTextArea = ({ title, name, label, defaultValue, placeholder, method, path, transform, rows, buttonText, cancelButton, ...props }) => {
  const [text, setText] = useState(defaultValue)

  useEffect(() => {
    setText(defaultValue)
    textAreaRef.current.value = defaultValue
  }, [defaultValue])

  const textAreaRef = useRef()

  const { successFlash } = useFlash()

  let request, submit, data

  switch (method) {
  case 'put':
    request = usePut(() => {
      successFlash(`Successfully updated${ title ? ` ${ title }.` : '.' }`)
      textAreaRef.current.blur()

      if(props.onSubmit) props.onSubmit(text)
    })

    submit = request.put
    data = request.data

    break
  case 'post':
    request = usePost(() => {
      successFlash(`Successfully created ${ title ? ` ${ title }.` : '.' }`)
      textAreaRef.current.blur()

      if(props.onSubmit) props.onSubmit(text)
    })

    submit = request.post
    data = request.data

    break
  }

  const handleChange = (e) => {
    setText(e.target.value)

    if(props.onChange) props.onChange(e)
  }

  const handleSubmit = () => {
    submit(path, transform(text))
  }

  const { metaKey, handleMetaEnter } = useMetaEnter(handleSubmit)

  return(
    <div className={classNames("min-w-0 relative", props.className)}>
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <TextArea
         ref={textAreaRef}
         inputClassName='block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm'
         name={name}
         label={label}
         rows={rows}
         defaultValue={defaultValue}
         placeholder={placeholder}
         onChange={handleChange}
         onKeyDown={handleMetaEnter} />

        <div className="pt-1 pb-2" aria-hidden="true">
          <div className="py-0.5">
            <div className="h-9" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-px flex justify-end py-2 pl-3 pr-2 border-t border-gray-200 bg-gray-50 rounded-br-lg rounded-bl-lg">
        <div className="flex-shrink-0 flex space-x-2">
          <Button
           type="submit"
           size="sm"
           disabled={data.isLoading}
           onClick={handleSubmit}>
            { 
              data.isLoading
              ? <>
                  Submitting...
                </>
              : <>
                  {buttonText}
                  <span className="text-xs ml-1">
                    ({ metaKey } + Enter)
                  </span>
                </>
            }
          </Button>
          {
            cancelButton &&
            <Button
             variant="secondary"
             onClick={props.onCancel}
             disabled={data.isLoading}>
              Cancel
            </Button>
          }
        </div>
      </div>
    </div>
  )
}

RemoteTextArea.defaultProps = {
  buttonText: 'Submit',
  defaultValue: '',
  rows: 20
}

export default RemoteTextArea
