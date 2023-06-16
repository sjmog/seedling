import React, { useState, useEffect, useContext } from 'react'
import { Alert, Loading } from 'components/shared'
import { get } from 'api'
import AppContext from 'contexts/AppContext'
import useFlash from 'hooks/useFlash'
import useIsMounted from 'hooks/useIsMounted'

const useFetch = (path, onSuccess, propertiesToWatch = [], { onError = null, onlyIf = true } = {}) => {
  const isMounted = useIsMounted()

  const { apiUrl } = useContext(AppContext)
  const { errorFlash } = useFlash()

  const [data, setData] = useState({ isLoading: false, errorMessage: null })

  const handleSuccess = (data) => {
    // success is often a setState call
    if(isMounted.current) {
      if(onSuccess) onSuccess(data)
      setData({ ...data, isLoading: false })
    }
  }

  const handleError = async (response) => {
    if(isMounted.current) {
      const error = await response.json()

      setData({ isLoading: false, errorMessage: error.message})
      errorFlash(error.message)
      if(onError) onError(error)
    }
  }

  const fetch = () => {
    if(isMounted.current) {
      setData({ ...data, isLoading: true })
      get(`${ apiUrl }/${ path }`, handleSuccess, handleError)
    }
  }

  useEffect(() => {
    if(propertiesToWatch.every(prop => prop) && onlyIf) fetch()
  }, propertiesToWatch)

  const loadingOrError = data.errorMessage
                         ? <Alert type="danger">{data.errorMessage}</Alert>
                         : data.isLoading
                         ? <Loading />
                         : null

  return { fetch, data, setData, loadingOrError }
}

export default useFetch
