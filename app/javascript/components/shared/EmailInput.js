import React from 'react'
import { Label, Tooltip } from 'components/shared'
import { classNames } from 'utils'

const EmailInput = React.forwardRef((props, ref) => {
  return(
    <div className={`${props.className}
                    ${ props.size ? `form-group-${props.size}` : '' }`}>

      { props.label
        && <Label
            className={props.className}
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
                       ${ props.button ? 'input-group-with-button' : '' }`}>
        <input
         ref={ref}
         onChange={props.onChange}
         onBlur={props.onBlur}
         onKeyPress={props.onKeyPress}
         required={props.required} 
         type="email" 
         name={props.name}
         value={props.value}
         defaultValue={props.defaultValue} 
         maxLength={props.maxlength}
         className={classNames(
           !!props.disabled && 'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
           'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
           props.className
         )}
         aria-label={props.label}
         placeholder={props.placeholder}
         autoComplete={props.autoComplete}
         autoFocus={props.autoFocus}
         disabled={props.disabled} />
        { props.button
          && <button
              className="btn btn-primary"
              onClick={props.onSubmit}>{props.buttonText}</button> }
      </div>
      { props.hint && <small className="form-text text-muted">{props.hint}</small> }
    </div>
  )
})

EmailInput.defaultProps = {
  className: '',
  onBlur: () => {},
  onKeyPress: () => {}
}

export default EmailInput;