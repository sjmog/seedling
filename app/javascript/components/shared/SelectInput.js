import React from 'react'
import { Hint, Button, Label } from 'components/shared'
import { classNames } from 'utils'

const SelectInput = React.forwardRef(({ hint, button, buttonText, size, name, label, value, defaultValue, onChange, onSubmit, required, disabled, children, ...props }, ref) => {
  return(
    <>
      {
        label &&
        <Label htmlFor={name}>{label}</Label>
      }

      <div className="flex items-center justify-between w-full">
        <select
          className={classNames(
            "mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
            props.className
          )}
          id={name}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          name={name}
          aria-label={label}
          disabled={disabled}>
          { children }
        </select>

        {
          button
          && <Button
              onClick={onSubmit}>{buttonText}</Button>
        }
      </div>

      {
        hint &&
        <Hint>{hint}</Hint>
      }
    </>
  )
})

export default SelectInput
