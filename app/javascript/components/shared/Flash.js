import React, { Fragment, useState, useContext, useEffect } from 'react'
import FlashContext from 'contexts/FlashContext'
import { Transition } from '@headlessui/react'
import { InformationCircleIcon, CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { classNames } from 'utils'

const Flash = (props) => {
  const {
    show,
    setShow,
    header,
    message,
    type = 'notice'
  } = useContext(FlashContext)

  const [dismissBarStyles, setDismissBarStyles] = useState({ width: '0%' })
  const [dismissBarInterval, setDismissBarInterval] = useState(null)

  const incrementDismissBar = () => {
    setDismissBarStyles((prevStyles) => {
      const currentWidth = parseFloat(prevStyles.width)

      if(currentWidth >= 100) {
        clearInterval(dismissBarInterval)
        setShow(false)
        return {
          width: `0%`
        }
      }

      return {
        width: `${currentWidth + 0.2}%`
      }
    })
  }

  useEffect(() => {
    if(show) {
      if(dismissBarInterval) {
        setDismissBarStyles({ width: '0%' })
        clearInterval(dismissBarInterval)
      }

      setDismissBarInterval(setInterval(incrementDismissBar, 10))
      return () => clearInterval(dismissBarInterval)
    } else {
      setDismissBarStyles({ width: '0%' })
      clearInterval(dismissBarInterval)
    }
  }, [show, header, message, type])

  const stopDismissBar = () => {
    clearInterval(dismissBarInterval)
  }

  const resumeDismissBar = () => {
    setDismissBarInterval(setInterval(incrementDismissBar, 10))
  }

  const TYPES_TO_COLORS = {
    notice: 'text-blue-400',
    alert: 'text-red-400',
    warning: 'text-yellow-400',
    success: 'text-green-400'
  }

  const TYPES_TO_DISMISS_BAR_COLORS = {
    notice: 'bg-blue-400',
    alert: 'bg-red-400',
    warning: 'bg-yellow-400',
    success: 'bg-green-400'
  }

  const TYPES_TO_ICONS = {
    notice: InformationCircleIcon,
    alert: XCircleIcon,
    warning: ExclamationCircleIcon,
    success: CheckCircleIcon
  }

  const color = TYPES_TO_COLORS[type] || TYPES_TO_COLORS.notice
  const dismissBarColor = TYPES_TO_DISMISS_BAR_COLORS[type] || TYPES_TO_DISMISS_BAR_COLORS.notice
  const Icon = TYPES_TO_ICONS[type] || TYPES_TO_ICONS.notice

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-30 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end" onMouseEnter={stopDismissBar} onMouseLeave={resumeDismissBar}>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}>
              <div className={classNames('h-1', dismissBarColor)} style={dismissBarStyles} />
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon className={classNames("h-6 w-6", color)} aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    {
                      header &&
                      <p className="text-sm font-medium text-gray-900 mb-0">{ header }</p>
                    }

                    {
                      message &&
                      <p
                       className={classNames(
                        "text-sm text-gray-500 mb-0",
                        header && 'mt-1'
                       )}>
                        { message }
                      </p>
                    }
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

export default Flash
