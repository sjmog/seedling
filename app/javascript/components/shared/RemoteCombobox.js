import React, { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import useFetch from 'hooks/useFetch'
import UserLabels from 'components/users/UserLabels'
import { classNames } from 'utils'

const RemoteCombobox = ({ title, placeholder, defaultValue, fetchPath, optionValue, optionLabel, ...props }) => {
  const [query, setQuery] = useState('')
  const [selectedOptions, setSelectedOptions] = useState(defaultValue)
  const [options, setOptions] = useState([])

  useFetch(fetchPath, setOptions, [])

  const filteredOptions =
    (query === '' || !query)
      ? options
      : options.filter((option) => {
          return option[optionLabel].toLowerCase().includes(query.toLowerCase())
        })

  const handleSetOptions = (newOptions) => {
    setSelectedOptions(newOptions)
    setQuery('')
    if(props.onChange) props.onChange(newOptions)
  }

  const handleRemoveOption = (value) => {
    const newOptions = selectedOptions.filter(option => option[optionValue] !== value)
    setSelectedOptions(newOptions)
    if(props.onChange) props.onChange(newOptions)
  }

  return (
    <Combobox as="div" value={selectedOptions} by={optionValue} onChange={handleSetOptions} nullable multiple className='w-full relative'>
     {
      selectedOptions.length > 0 &&
      <UserLabels
       className="block mb-2"
       labels={selectedOptions}
       dismissible
       onClick={handleRemoveOption} />
     }

      <Combobox.Button as='div'>
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
      </Combobox.Button>
      <Combobox.Button className="absolute bottom-2 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option[optionValue]}
                value={option}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{option[optionLabel]}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
    </Combobox>
  )
}

RemoteCombobox.defaultProps = {
  defaultValue: []
}

export default RemoteCombobox
