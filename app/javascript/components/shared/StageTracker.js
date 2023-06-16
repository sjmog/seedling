import React, { Fragment, useContext } from 'react'
import AppContext from 'contexts/AppContext'
import { classNames } from 'utils'
import { Link } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Stage = ({ index, isCurrent, isLast, onChange, ...stage }) => {
  const { currentUser } = useContext(AppContext)

  const stageLabels = {
    'open-ended question': 'Question',
    'allocator': 'Poll',
    'interactive video': 'Video',
    'notion': 'Article',
    'internal': 'Activity',
    'review': 'Review',
    'warmup': 'Warm-up',
    'questions': 'Exercise',
    'certification': 'Certification'
  }

  return(
    <li className="relative md:flex md:flex-1">
      <Link
       to={stage.slug}
       className={classNames(
        "flex items-center pl-6 pr-11 py-2 text-sm font-medium group",
        isLast && 'pr-6'
       )}
       aria-current={ isCurrent ? 'stage' : undefined }>
        <span
         className={classNames(
           "flex items-center justify-between text-sm font-medium text-gray-500 group-hover:text-gray-700"
         )}>
          <span className={classNames(isCurrent && 'text-indigo-600 group-hover:text-indigo-600')}>
            {stageLabels[stage.type]}
          </span>
        </span>
      </Link>

      {!isLast ? (
        <>
          {/* Arrow separator for lg screens and up */}
          <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
            <svg
              className="h-full w-full text-gray-200"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vectorEffect="non-scaling-stroke"
                stroke="currentcolor"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      ) : null}
    </li>
  )
}


const StageTracker = ({ stages, currentStageSlug, ...props }) => {
  if(!stages || stages.length === 0) return null

  return(
    <nav aria-label="Progress">
      <ol role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200 md:flex md:divide-y-0 mb-0">
        {
          stages.map((stage, index) => <Stage
                                        key={`stage-${stage.slug}`}
                                        index={index}
                                        isCurrent={currentStageSlug === stage.slug}
                                        isLast={index === stages.length - 1}
                                        onChange={props.onChange}
                                        { ...stage } />)
        }
      </ol>
    </nav>
  )
}

export default StageTracker