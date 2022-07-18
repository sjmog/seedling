import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from 'utils'
import { get } from 'api'
import AppContext from 'contexts/AppContext'

const SelectedItem = ({ text }) => {
  return(
    <span className="truncate bg-indigo-500 text-white mr-1 p-1 rounded-sm font-semibold text-xs">
      { text }
    </span>
  )
}

// Props
//
// label:string
// options:array[Object{ value:string, label:string, truncatedLabel:string }]
// selected:array[]
// onChange:function(option:Object)

const MultiSelect = (props) => {
  return (
    <Listbox multiple={true} as="div" value={props.selected} onChange={props.onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">{props.label}</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {
                props.selected.length > 3
                  ? <>
                      {
                        props.selected.slice(0, 3).map((option, index) => <SelectedItem
                                                                           key={index}
                                                                           text={option.truncatedLabel ? option.truncatedLabel : option.value.toUpperCase()} />)
                      }

                      <span className="font-xs text-gray-300">+{props.selected.length - 3}</span>
                    </>
                  : <>
                      { 
                        props.selected.map((option, index) => <SelectedItem
                                                               key={index}
                                                               text={option.truncatedLabel ? option.truncatedLabel : option.value.toUpperCase()} />)
                      }
                    </>
              }
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {props.options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-8 pr-4'
                      )
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default MultiSelect
