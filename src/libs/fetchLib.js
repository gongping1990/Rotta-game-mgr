// import { ZEUS_GATEWAY } from './fetchConfig'
import { api } from './fetchConfig'
import axios from 'axios'
import store from '@/store/store'
export const invoke = async (cfg) => {
  const token = store.state.token
  // console.log('发送请求时的token为', token)
  const requestConfig = {
    baseURL: api,
    headers: {
      Authorization: `Bearer ${token}`
    },
    ...cfg
  }
  try {
    const response = await axios.request(requestConfig)
    return [0, response]
  } catch (e) {
    return [e, 0]
  }
}
