import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from 'utils'

const Modal = ({ open, onClose, ...props }) => {
  const TYPES_TO_ICON_BG = {
    notice: 'bg-blue-100',
    alert: 'bg-red-100',
    warning: 'bg-yellow-100',
    success: 'bg-green-100',
    idea: 'bg-blue-100'
  }

  const TYPES_TO_ICON_COLORS = {
    notice: 'text-blue-600',
    alert: 'text-red-600',
    warning: 'text-yellow-600',
    success: 'text-green-600',
    idea: 'text-blue-600'
  }

  const iconBg = TYPES_TO_ICON_BG[props.type] || TYPES_TO_ICON_BG.notice
  const iconColor = TYPES_TO_ICON_COLORS[props.type] || TYPES_TO_ICON_COLORS.notice

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {
                  props.dismissible &&
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                }
                <div>
                  {
                    props.Icon &&
                    <div
                     className={classNames(
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-full",
                      iconBg
                     )}>
                      <props.Icon
                       className={classNames("h-6 w-6", iconColor)}
                       aria-hidden="true" />
                    </div>
                  }
                  <div className="mt-3 text-center sm:mt-5">
                    {
                      props.title &&
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        { props.title }
                      </Dialog.Title>
                    }

                    {
                      props.description &&
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          { props.description }
                        </p>
                      </div>
                    }

                    {
                      props.children &&
                      props.children
                    }
                  </div>
                </div>
                {
                  props.button &&
                  <div className="mt-5 sm:mt-6">
                    {
                      props.button
                    }
                  </div>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal