import Token from '../models/Token.js'
import { hashService } from './index.js'
import axios from 'axios'
import Cookie from 'js-cookie'
import jwt_decode from "jwt-decode"

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export default class AuthService {
    constructor() {
        axios.defaults.baseURL = process.env.VUE_APP_AUTH_API_BASE_URL
    }

    login (data) {
        data.hash = hashService.getHashFromCookies()

        return axios.post('/login', data)
            .then(response => {
                hashService.saveHashToCookies(response.data.hash)
                this.saveToken(response.data)
                this.redirect()

                return Promise.resolve(response)
            })
            .catch(error => {
                this.removeToken()

                return Promise.reject(error.response)
        })
    }

    redirect () {
        const redirectUrl = this.getRedirectUrl()
        window.location.replace(redirectUrl)
    }

    getRedirectUrl () {
        const url = new URL(window.location.href)
        const param = url.searchParams.get('r')

        if (!param) return process.env.VUE_APP_BASE_HOST_URL

        const redirectUrl = new URL(process.env.VUE_APP_BASE_HOST_URL)
        redirectUrl.hostname = `${param}.${redirectUrl.hostname}`
        
        if (url.hash) redirectUrl.pathname = `/${url.hash.split('#')[1]}`

        return redirectUrl
    }

    loggedIn () {
        if (!this.tokenExists()) {
            return false
        }

        return true
    }

    getToken () {
        const accessToken = Cookie.get(ACCESS_TOKEN_KEY)
        const refreshToken = Cookie.get(REFRESH_TOKEN_KEY)
    
        return new Token(accessToken, refreshToken)
    }

    saveToken (token) {
        const domain = this.getDomain()
        const jwtAccess = jwt_decode(token.accessToken)
        const jwtRefresh = jwt_decode(token.refreshToken)

        Cookie.set(ACCESS_TOKEN_KEY, token.accessToken, { 
            domain: domain, 
            expires: new Date(jwtAccess.exp * 1000) 
        })
        Cookie.set(REFRESH_TOKEN_KEY, token.refreshToken, { 
            domain: domain, 
            expires: new Date(jwtRefresh.exp * 1000) 
        })
    }

    removeToken () {
        Cookie.remove(ACCESS_TOKEN_KEY)
        Cookie.remove(REFRESH_TOKEN_KEY)
    }

    tokenExists () {
        const token = this.getToken()
    
        return token.accessToken !== undefined && token.refreshToken !== undefined
    }

    getDomain () {
        return window.location.hostname === 'localhost' ? window.location.hostname : process.env.VUE_APP_COOKIE_DOMAIN
    }
}
