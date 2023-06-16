import React, { Fragment } from 'react'
import { Label, Hint, Tooltip } from 'components/shared'
import { classNames } from 'utils'

const TextArea = React.forwardRef((props, ref) => {  
  return(
    <div className={classNames(props.className)}>
      {
        props.label
        && <Label
            className={classNames("mb-1 ml-1", props.labelClassNames)}
            htmlFor={ props.name }>
            { props.label }
            { 
              props.required && 
              <Tooltip text='This field is required.' className="inline">
                <span className='superscript text-red-500'>
                  *
                </span>
              </Tooltip>
            }
          </Label>
      }

      {
        props.hint &&
        <Hint className="mb-2">{ props.hint }</Hint>
      }

      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <textarea
         ref={ref}
         rows={ props.rows }
         name={ props.name }
         id={ props.name }
         required={ props.required }
         aria-label={ props.label }
         className={classNames("block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm", props.inputClassName)}
         placeholder={ props.placeholder }
         defaultValue={ props.defaultValue } 
         onChange={props.onChange}
         onKeyDown={props.onKeyDown} />
      </div>
    </div>
  )
})

TextArea.defaultProps = {
  rows: 5
}

export default TextArea
