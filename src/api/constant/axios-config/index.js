import axios from 'axios'
import { stringify } from 'qs'
import StorageUtil, { STORAGE_KEY } from '../../../util/storage'
import Router from 'next/router'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

axiosClient.interceptors.request.use(
  function (config) {
    const token = StorageUtil.get(STORAGE_KEY.JWT)
    if (
      typeof token !== 'undefined' &&
      token &&
      !config.url?.includes('X-Amz-Algorithm')
    ) {
      if (config.headers)
        config.headers['Authorization'] = 'Bearer ' + encodeURIComponent(token)
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (
      !error.config.headers['Authorization'] ||
      error.response.status === 401 ||
      error.response.status === 403
    ) {
      localStorage.clear()
      Router.push('/login')
    }
    return Promise.reject(error)
  }
)

class AxiosFetch {
  get(uri, params = {}) {
    const queryString = stringify(params)
    const uriWithQuery = `${queryString ? uri + '?' : uri}${queryString}`
    return axiosClient.get(uriWithQuery)
  }
  post(uri, body = {}) {
    return axiosClient.post(uri, body)
  }
  put(uri, body = {}, config = {}) {
    return axiosClient.put(uri, body, config)
  }
  delete(uri, body = {}) {
    return axiosClient.delete(uri, body)
  }
  patch(uri, body = {}) {
    return axiosClient.patch(uri, body)
  }
}

const appAxios = new AxiosFetch()

export default appAxios
