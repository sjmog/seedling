import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Spinner from './Spinner'

const Loading = ({ loading, setIsTransitioning }) => {
  const entryDuration = 300
  const waitingDuration = 300
  const exitDuration = 300

  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    setIsShowing(true)
  }, [])

  useEffect(() => {
    if(!loading) {
      setTimeout(() => {
        setIsShowing(false)
      }, waitingDuration)

      setTimeout(() => {
        setIsTransitioning(false)
      }, waitingDuration + exitDuration)
    }
  }, [loading])

  return(
    <Transition
      show={isShowing}
      className={"col-span-6"}
      enter={`transition-opacity duration-${entryDuration}`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={`transition-opacity duration-${exitDuration}`}
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <div className="flex justify-center items-center mt-14">
        <div className="flex justify-center items-center py-4 px-8 border-2 rounded bg-gray-200">
          <Spinner />
          <span className="text-gray-500 font-semibold">Loading</span>
        </div>
      </div>
    </Transition>
  )
}

export default Loading