import React from 'react'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { classNames } from 'utils'

const Pagination = ({ className, top, small, pageOptions, canPreviousPage, canNextPage, pageIndex, gotoPage, previousPage, nextPage, pageSize, setPageSize, pageControls, pageCount, pageSelector, perPageControls, ...props }) => {
  const pages = () => {
    const pageArray = Array.from({ length: pageOptions.length }, (_, i) => i)
    if(pageOptions.length <= 7) return pageArray

    const isInFirstOrLastPages = [0, 1, pageOptions.length - 2, pageOptions.length - 1].includes(pageIndex)
    if(isInFirstOrLastPages) return [...pageArray.slice(0, 3), '...', ...pageArray.slice(-3)]

    const isBelowMidpoint = pageIndex < Math.floor(pageOptions.length / 2)
    if(isBelowMidpoint) return (
      [
        0,
        pageIndex - 1,
        pageIndex,
        pageIndex + 1,
        '...',
        ...pageArray.slice(-2)
      ]
    )

    return(
      [
        0,
        1,
        '...',
        pageIndex - 1,
        pageIndex,
        pageIndex + 1,
        pageArray[pageArray.length - 1]
      ]
    )
  }

  return (
    <nav className={classNames(
      "flex items-center justify-between border-gray-200",
      top ? 'border-b pt-2' : 'border-t pb-2',
      props.className
    )}>
      {
        pageControls &&
        <div className={classNames("flex w-0 flex-1", top ? '' : '-mt-px')}>
          <button
            className={classNames(
              "inline-flex items-center border-transparent pr-1 ml-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:border-none",
              top ? 'border-b-2 pb-2' : 'border-t-2 pt-2'
            )}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ArrowLongLeftIcon className={classNames("h-5 w-5 text-gray-400", canPreviousPage || 'text-gray-200')} aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </button>
        </div>
      }

      <div className={classNames("hidden md:flex", top ? '-mb-[3px]' : '-mt-[3px]')}>
        {
          pages().map(index => (
            index === '...'
            ? <span key="separator"
               className={classNames(
                "inline-flex items-center border-transparent text-xs font-medium text-gray-500",
                small ? 'px-2' : 'px-4',
                top ? 'border-b-2 pb-2' : 'border-t-2 pt-2'
               )}>
                ...
              </span>
            : <button
               key={index}
                className={classNames(
                  "inline-flex items-center border-transparent text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  small ? 'px-2' : 'px-4',
                  pageIndex === index && "border-indigo-500 text-indigo-600",
                  top ? 'border-b-2 pb-2' : 'border-t-2 pt-2'
                )}
                onClick={() => gotoPage(index)}
              >
                { index + 1 }
              </button>
          ))
        }

      </div>
      {
        pageControls &&
        <div className={classNames("flex w-0 flex-1 justify-end", top ? '' : '-mt-[3px]')}>
          <button
            className={classNames(
              "inline-flex items-center border-transparent pl-1 mr-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:border-none",
              top ? 'border-b-2 pb-2' : 'border-t-2 pt-2'
            )}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <span className="sr-only">Next</span>
            <ArrowLongRightIcon className={classNames("h-5 w-5 text-gray-400", canNextPage || 'text-gray-200')} aria-hidden="true" />
          </button>
        </div>
      }
    </nav>
  )
}

Pagination.defaultProps = {
  className: '',
  pageControls: false,
  pageCount: false,
  pageSelector: false,
  perPageControls: false,
  small: false
}

export default Pagination
