const useFetch = (url, method, { formToken, body }, callback, errorHandler) => {
  const headers = method !== 'GET' ? {
                                        'Content-Type': 'application/json',
                                        'X-CSRF-Token': formToken
                                      }
                                   : null

  let meta = {
    method: method,
    body: JSON.stringify(body)
  }

  if(headers) meta = {...meta, headers}

  return async () => {
    try {
      const response = await fetch(url, meta)

      if(response.ok) {
        try {
          const data = await response.json()

          if(callback) callback(data)
        } catch(err) {
          console.error(err)
          console.error(response)

          if(errorHandler) errorHandler(err, response)
        }
      } else {
        console.error('Response not OK')
        console.error(response)

        if(errorHandler) errorHandler('Response not OK', response)
      }
    } catch (err) {
      console.error(err)

      if(errorHandler) errorHandler(err)
    }
  }
}

export const useGet = (url, callback, errorHandler) => useFetch(url, 'GET', {}, callback, errorHandler)
export const usePut = (url, { formToken, body }, callback, errorHandler) => useFetch(url, 'PUT', { formToken, body }, callback, errorHandler)
export const usePost = (url, { formToken, body }, callback, errorHandler) => useFetch(url, 'POST', { formToken, body }, callback, errorHandler)
export const useDelete = (url, { formToken }, callback, errorHandler) => useFetch(url, 'DELETE', { formToken }, callback, errorHandler)

export const get = (url, callback, errorHandler) => {
  useGet(url, callback, errorHandler)()
}

export const put = (url, { formToken, body }, callback, errorHandler) => {
  usePut(url, { formToken, body }, callback, errorHandler)()
}

export const post = (url, { formToken, body }, callback, errorHandler) => {
  usePost(url, { formToken, body }, callback, errorHandler)()
}

export const destroy = (url, { formToken, body }, callback, errorHandler) => {
  useDelete(url, { formToken }, callback, errorHandler)()
}
