import React, { useState, useEffect, useContext } from 'react'
import { Alert, Loading } from 'components/shared'
import { put as apiPut } from 'api'
import AppContext from 'contexts/AppContext'
import useFlash from 'hooks/useFlash'
import useIsMounted from 'hooks/useIsMounted'

const usePut = (onSuccess, onError = null) => {
  const isMounted = useIsMounted()

  const { apiUrl, formToken } = useContext(AppContext)
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

  const put = (path, body = {}) => {
    setData({ ...data, isLoading: true })
    apiPut(`${ apiUrl }/${ path }`, { formToken, body }, handleSuccess, handleError)
  }

  const loadingOrError = () => {
    return(
      data.errorMessage
        ? <Alert type="danger">{data.errorMessage}</Alert>
        : data.isLoading
          ? <Loading />
          : null
    )
  }

  return { put, data, setData, loadingOrError }
}

export default usePut
