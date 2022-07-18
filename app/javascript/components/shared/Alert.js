import React, { useState } from 'react'

const Alert = ({ type, children }) => {
  const [show, setShow] = useState(true)

  const TYPES_TO_COLORS = {
    notice: 'blue',
    alert: 'red',
    warning: 'yellow',
    success: 'green'
  }

  const TYPES_TO_ICON_PATHS = {
    notice: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',
    alert: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
    warning: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
    success: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  }

  const color = TYPES_TO_COLORS[type] || TYPES_TO_COLORS.notice
  const iconPath = TYPES_TO_ICON_PATHS[type] || TYPES_TO_ICON_PATHS.notice

  if(!show) return null;

  return(
    <div
     className={`rounded-md bg-${ color }-50 p-4 mb-2`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg 
           className={`h-5 w-5 text-${ color }-400`}
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 20 20"
           fill="currentColor"
           aria-hidden="true">
            <path
             fillRule="evenodd"
             d={iconPath}
             clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p
           className={`text-sm font-medium text-${ color }-800`}>
           { children }
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
             type="button"
             className={`inline-flex bg-${ color }-50 rounded-md p-1.5 text-${ color }-400 hover:bg-${ color }-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:text-${ color }-600`}
             onClick={ () => setShow(false) }>
              <span className="sr-only">Dismiss</span>
              <svg
               className="h-5 w-5"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               aria-hidden="true">
                <path
                 fillRule="evenodd"
                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                 clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert