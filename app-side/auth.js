import { CLIENT_ID, CLIENT_SECRET } from '../secrets'
import { xhr, store } from './utils'

const URL = 'https://ticktick.com/oauth/token'
const HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

const BODY = {
  get token() {
     return new URLSearchParams({
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'redirect_uri': 'http://zepp-os.zepp.com/app-settings/redirect.html',
      'code': store.code,
      'scope': 'tasks:write tasks:read',
      'grant_type': 'authorization_code',
    }).toString()
  },

  get refresh() {
     return new URLSearchParams({
      'client_id': CLIENT_ID,
      'refresh_token': store.refresh_token,
      'grant_type': 'refresh_token',
    }).toString()
  }
}

const { removeItem, setItem } = store

const fetchToken = async () => {
  removeItem('access_token')
  removeItem('refresh_token')
  const { access_token, refresh_token } = await xhr(URL, 'POST', HEADERS, BODY.token)
  setItem('access_token', access_token)
  setItem('refresh_token', refresh_token)
  removeItem('code')
}

const refreshToken = async () => {
  const { access_token, refresh_token } = await xhr(URL, 'POST', HEADERS, BODY.refresh)
  setItem('access_token', access_token)
  setItem('refresh_token', refresh_token)
}

const Auth = {
  fetchToken,
  refreshToken,
}

export default Auth
