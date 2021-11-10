import { authService } from './index.js'
import platform from 'platform'
import axios from 'axios'
import Cookie from 'js-cookie'

const STORAGE_KEY = 'deviceHash'

export default class HashService {
  constructor () {
    axios.defaults.headers['Device-Info'] = this.getDeviceinfo()

  }
  getDeviceinfo () {
    return `${platform.os};${platform.name};${platform.version};labirint`
  }

  getHashFromCookies () {
    return Cookie.get(STORAGE_KEY)
  }

  saveHashToCookies (hash) {
    Cookie.set(STORAGE_KEY, hash, { domain: authService.getDomain(), expires: 365 })
  }
}
