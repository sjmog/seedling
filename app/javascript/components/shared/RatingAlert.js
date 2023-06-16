import React, { Fragment, useState, useContext } from 'react'
import { Alert } from 'components/shared'
import { RatingInput } from 'components/shared'

import AppContext from 'contexts/AppContext'
import usePut from 'hooks/usePut'

const RatingAlert = ({ attempt, issueAttempt }) => {
  const theAttempt = attempt || issueAttempt
  const attemptType = attempt ? 'activity' : 'challenge'

  const { currentUser } = useContext(AppContext)
  const [show, setShow] = useState(true)
  const [rated, setRated] = useState(!!theAttempt.rating)
  const [showConfirmation, setShowConfirmation] = useState(false)

  theAttempt.incomplete = attempt
                          ? attempt.status !== 'complete'
                          : !issueAttempt.completed

  const { put } = usePut(() => setShowConfirmation(true))

  const handleRate = (rating) => {
    if(issueAttempt) {
      const body = { issue_attempt: { rating } }
      put(`issue_attempts/${issueAttempt.id}`, body)
    } else if(attempt) {
      const body = { attempt: { rating } }
      put(`users/${currentUser.id}/attempts/${attempt.id}`, body)
    }
  }

  return(
    <Alert
     dismissible
     className="rounded-none"
     onClose={() => setShow(false)}>
      {
        rated ?
          <>
            You rated this activity {theAttempt.rating}/5 stars.
            <span className="ml-1 font-semibold cursor-pointer" onClick={() => setRated(false)}>
              Change rating
            </span>
          </>
        : showConfirmation ?
          <>
            Thank you for your feedback!
          </> 
        : <div className="flex items-center justify-between w-full">
            <span className="mr-2 text-sm">
              { theAttempt.incomplete && "Great job! " }
              How did you find this {attemptType}?
            </span>
            <RatingInput initialValue={theAttempt.rating} onClick={handleRate} />
          </div>
      }
    </Alert>
  )
}

export default RatingAlert
