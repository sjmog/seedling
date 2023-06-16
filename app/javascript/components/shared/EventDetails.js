import React, { useContext, useState } from 'react'
import { Hint } from 'components/shared'
import { Link } from 'react-router-dom'
import { excerpt, stripTags, possessive, interpolate } from 'utils'
import moment from 'moment'
import AppContext from 'contexts/AppContext'

const EventDetails = ({ id, type, attempt, question, response, createdAt, readByIds, userOrganizationName, extra, small, showIcon, short, noLink, onDestroy }) => {
  const { currentUser, apiUrl, formToken } = useContext(AppContext)

  let parsedExtra = extra ? JSON.parse(extra) : undefined

  const questionText = (question?.text && !short)
                        ? `"${interpolate(excerpt(stripTags(question.text), 9), { organization: { name: userOrganizationName } })}"`
                        : 'a question'

  const attemptActivityTitle = attempt?.activity?.title ? attempt.activity.title : 'an activity'

  const branchTitle = parsedExtra?.ref || 'unknown branch'
  const prTitle = parsedExtra?.pull_request?.title || 'Unknown title'
  const reviewerHandle = parsedExtra?.review?.user?.login || 'a trainer'

  const title = () => {
    switch(type) {
      default: return "Unknown Event type"
      case 'unclassified': return 'Unclassified Event type'
      case 'attempt_started': return `Started ${ attemptActivityTitle }`
      case 'attempt_completed': return `Completed ${ attemptActivityTitle }`
      case 'first_response_created': return `Answered ${ questionText } in ${ attemptActivityTitle }`
      case 'subsequent_response_created': return `Revised ${ questionText } in ${ attemptActivityTitle }`
      case 'feedback_given': return `Responded to ${ response?.discussion?.user?.firstName ? possessive(response.discussion.user.firstName) : "somebody's" } discussion for ${ questionText }`
      case 'branch_started': return `Started a new issue branch: <code>${ branchTitle }</code>`
      case 'pull_request_closed': return `Closed an existing pull request`
      case 'pull_request_opened': return `Opened PR <code>${ prTitle }</code> for review`
      case 'pull_request_approved': return `Received approval on <code>${ prTitle }</code> from ${ reviewerHandle }`
      case 'pull_request_merged': return `Merged <code>${ prTitle }</code>`
    }
  }

  const icon = () => {
    switch(type) {
      default: return 'question_mark'
      case 'unclassified': return 'question_mark'
      case 'attempt_started': return 'flight_takeoff'
      case 'attempt_completed': return 'done'
      case 'first_response_created': return 'chat_bubble'
      case 'subsequent_response_created': return 'feedback'
      case 'feedback_given': return 'question_answer'
      case 'branch_started': return `add`
      case 'pull_request_closed': return `cancel`
      case 'pull_request_opened': return `switch_access_shortcut`
      case 'pull_request_approved': return `grade`
      case 'pull_request_merged': return `verified`
    }
  }

  const link = () => {
    switch(type) {
      default: return null
      case 'unclassified': return null
      case 'attempt_started': return null
      case 'attempt_completed': return `/activities/${attempt.activity.slug}/summary`
      case 'first_response_created': return null
      case 'subsequent_response_created': return null
      case 'feedback_given': return null
      case 'branch_started': return `${parsedExtra?.repository?.html_url}/tree/${parsedExtra?.ref}`
      case 'pull_request_closed': return parsedExtra?.pull_request?.html_url
      case 'pull_request_opened': return parsedExtra?.pull_request?.html_url
      case 'pull_request_approved': return parsedExtra?.pull_request?.html_url
      case 'pull_request_merged': return parsedExtra?.pull_request?.html_url
    }
  }

  const isBranch = ['branch_started'].includes(type)

  const isPullRequest = ['pull_request_closed',
                         'pull_request_opened',
                         'pull_request_approved',
                         'pull_request_merged'].includes(type)

  if(isPullRequest && type === 'pull_request_merged') console.log(parsedExtra)

  const isExternalLink = (isBranch && !!parsedExtra?.repository?.html_url && !!parsedExtra?.ref)
                         || (isPullRequest && !!parsedExtra?.pull_request?.html_url)

  const Wrapper = (isExternalLink && !noLink)
                  ? 'a'
                  : (link() && !noLink)
                    ? Link
                    : 'span'

  return(
    <Wrapper
     to={link()}
     href={link()}
     target={isExternalLink ? '_blank' : null}
     className={`EventDetails ${ small ? 'EventDetails--small' : '' }`}>

        {/*{ showIcon && <IconAvatar icon={icon()} /> }*/}
        <span>
          <Hint tiny className="mb0">{moment(createdAt).fromNow()}</Hint>
          <div className="EventTitle" dangerouslySetInnerHTML={ { __html: title() }} />
        </span>
    </Wrapper>
  )
}

EventDetails.defaultProps = {
  small: false,
  showIcon: false,
  short: false,
  noLink: false
}

export default EventDetails
