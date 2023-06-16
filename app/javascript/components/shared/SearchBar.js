import React, { useState } from 'react'
import { TextInput } from 'components/shared'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import useMetaEnter from 'hooks/useMetaEnter'
import { classNames } from 'utils'

const SearchBar = ({ ...props }) => {
  const [text, setText] = useState(props.defaultValue)
  const [isFocussed, setIsFocussed] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setIsChanged(true)
    setText(e.target.value)

    if(props.onChange) props.onChange(e)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    if(props.submittable) props.onSubmit(text)
  }

  const { metaKey, handleMetaEnter } = useMetaEnter(handleSubmit)

  return(
    <div className={classNames("min-w-0 flex-1", props.className)}>
      <label htmlFor="search" className="sr-only">
        { props.screenreaderLabel }
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <TextInput
         name='search'
         placeholder={ props.placeholder }
         defaultValue={text}
         onChange={handleChange}
         onKeyDown={handleMetaEnter}
         onFocus={() => setIsFocussed(true)}
         onBlur={() => setIsFocussed(false)}
         inputClassName={classNames(
           'pl-10',
           (props.submittable && (isFocussed || isChanged)) && 'pr-24'
         )} />

         {
           (props.submittable && (isFocussed || isChanged)) &&
           <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
             <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-xs font-medium text-gray-400">
               {
                 isSubmitting
                 ? 'Submitting...'
                 : `${ metaKey } + Enter`
               }
             </kbd>
           </div>
         }
      </div>
    </div>
  )
}

SearchBar.defaultProps = {
  screenreaderLabel: 'Search',
  placeholder: 'Search',
  defaultValue: '',
  submittable: false
}

export default SearchBar
