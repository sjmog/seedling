import React from 'react'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { Label, Tooltip } from 'components/shared'
import { classNames } from 'utils'

const TextInput = React.forwardRef((props, ref) => {
  return(
    <div className={`${props.className}
                     ${ props.size ? `form-group-${props.size}` : '' }`}>
      { props.label
        && <Label
            className={classNames("mb-1 ml-1", props.labelClassName)}
            htmlFor={props.name}>
            {props.label}
            { 
              props.required && 
              <Tooltip text='This field is required.' className="inline">
                <span className='superscript text-red-500'>
                  *
                </span>
              </Tooltip>
            }
           </Label> }
      <div className={`input-group
                       relative
                       ${ props.button ? 'flex rounded-md shadow-sm' : '' }`}>

        {
          (!!props.icon || !!props.error || !!props.success)
          && <div className='pointer-events-none absolute insert-y-0 left-0 flex items-center pl-1 pt-1'>
               {
                 props.error
                 ? <ExclamationCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                 : props.success
                   ? <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                   : props.icon
               }
             </div>
        }

        <input
         id={props.id}
         className={classNames(
          'shadow-sm sm:text-sm block w-full',
          props.button ? 'rounded-none rounded-l-md' : 'rounded-md',
          !!props.icon && 'pl-10',
          !!props.error && 'border-red-300 pl-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-none',
          !!props.success && 'border-green-300 pl-10 text-green-900 placeholder-green-300 focus:border-green-500 focus:ring-green-500 focus:outline-none',
          !props.success && !props.error && 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
          !!props.disabled && 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
          props.inputClassName,
        )}
         ref={ref}
         disabled={props.disabled}
         onClick={props.onClick}
         onChange={props.onChange}
         onFocus={props.onFocus}
         onBlur={props.onBlur}
         onKeyPress={props.onKeyPress}
         onKeyDown={props.onKeyDown}
         required={props.required} 
         type={props.type} 
         name={props.name}
         value={props.value}
         autoComplete={props.autoComplete}
         defaultValue={props.defaultValue} 
         maxLength={props.maxlength}
         aria-label={props.label}
         aria-invalid={!!props.error}
         aria-describedby={
          !!props.error
          ? `${ props.name }-error`
          : !!props.success 
            ? `${ props.name }-success`
            : null }
         placeholder={props.placeholder} />

         { props.button
           && <button
               className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
               onClick={props.onSubmit}>
               {props.buttonText}
              </button> }
      </div>
      { props.hint && <small className="form-text text-muted">{props.hint}</small> }

      {
        !!props.error
        && <p className="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
              { props.error }
            </p>
      }

      {
        !!props.success
        && <p className="mt-2 text-sm text-green-600" id={`${props.name}-success`}>
              { props.success }
            </p>
      }
    </div>
  )
})

TextInput.defaultProps = {
  onBlur: () => {},
  onKeyPress: () => {},
  type: 'text',
  disabled: false,
  labelClassName: '',
  inputClassName: ''
}

export default TextInput