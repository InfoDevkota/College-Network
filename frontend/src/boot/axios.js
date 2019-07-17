import axios from 'axios'
import { SessionStorage } from 'quasar'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/'
})

/*
 * The interceptor here ensures that we check for the token in session storage every time an ajax request is made
 */
axiosInstance.interceptors.request.use(
  (config) => {
    let token = SessionStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
