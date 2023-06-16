import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from 'utils'

const Panel = ({ show, size, className, children }) => {
  return (
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className={classNames("relative z-10", className)} onClose={() => {}}>
          <div
           className={classNames(
            "absolute inset-0 overflow-hidden",
            size === 'full' && 'md:left-20'
           )}>
            <div className={classNames(
              "pointer-events-none fixed inset-y-0 right-0 flex max-w-full",
              size === 'full' && 'pl-20'
             )}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                 className={classNames(
                  "pointer-events-auto w-screen",
                  size === 'sm' && 'max-w-sm',
                  size === 'md' && 'max-w-md',
                  size === 'lg' && 'max-w-lg',
                  size === 'full' && 'max-w-none'
                 )}>
                  <div className="h-full bg-white shadow-xl flex flex-col">
                    { children }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )
}

Panel.Header = ({ children, ...props }) => {
  return(
    <div
     className={classNames(
      "w-100 border-b border-gray-200 flex justify-between items-start",
      props.className
     )}>
      { children }
      {
        props.dismissible &&
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onHide}>
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      }
    </div>
  )
}

Panel.Body = ({ children, ...props }) => {
  return(
    <div className={classNames("grow overflow-y-auto relative", props.className)}>
      { children }
    </div>
  )
}

Panel.Footer = ({ children, ...props }) => {
  return(
    <div
     className={classNames(
      "flex flex-shrink-0 justify-end px-4 py-4 border-t border-gray-200",
      props.className
     )}>
      { children }
    </div>
  )
}

Panel.defaultProps = {
  size: 'md'
}

export default Panel
