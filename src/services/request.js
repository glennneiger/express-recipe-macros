import axios from 'axios'
import { getToken } from '../services/token'

export const request = {
  get: async (resource, options, auth) => {
    const authRequired = auth ? auth.authRequired : false

    const opts = options ? options : {}
    const config = authRequired ? includeAuthHeader(opts) : opts

    const hasConfig = Object.keys(config).length

    console.log(resource, config)

    try {
      const res = hasConfig
        ? await axios.get(resource, config)
        : await axios.get(resource)
      return res
    } catch (e) {
      console.error(e)
      return null
    }
  },
}

export default request

const includeAuthHeader = options => {
  const token = getToken()

  console.log('includeAuthHeader token: ', token)

  if (!token) {
    return options
  }

  return {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  }
}
