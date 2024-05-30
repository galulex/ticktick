
import { CLIENT_ID, CLIENT_SECRET } from '../secrets'
import {
  MAIN,
  CONNECT_BTN,
  RESET_BTN,
} from './styles'

AppSettingsPage({
  build({ settingsStorage }) {
    const saveCode = ({ code }) => {
      settingsStorage.removeItem('debug')
      settingsStorage.removeItem('access_token')
      settingsStorage.removeItem('refresh_token')
      settingsStorage.setItem('code', code)
    }

    const code = settingsStorage.getItem('code')
    const token = settingsStorage.getItem('access_token')

    return View({ style: MAIN }, [
      (!token) && View({ style: CONNECT_BTN }, [
        Auth({
          label: '👤 Connect TickTick Account',
          authorizeUrl: 'https://ticktick.com/oauth/authorize',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          requestTokenUrl: 'https://ticktick.com/oauth/token',
          scope: 'tasks:write tasks:read',
          pkce: false,
          onAccessToken: saveCode,
          onReturn: saveCode,
        }),
      ]),

      (token || code) && Button({
        label: '🔶 RESET',
        style: RESET_BTN,
        onClick: () => {
          settingsStorage.removeItem('access_token')
          settingsStorage.removeItem('refresh_token')
          settingsStorage.removeItem('code')
        }
      }),

      (token || code) && Button({
        label: '🔄 REFRESH',
        style: RESET_BTN,
        onClick: () => {
          settingsStorage.setItem('update_at', Date.now())
        }
      }),

      Link({ source: 'https://buymeacoffee.com/galulex' }, [
        Text({
          paragraph: true,
          style: {
            margin: '10px 0',
            color: '#E82127',
          }
        }, 'Leave feadback or suggestions'),
      ]),
      Text({ paragraph: true, style: { wordBreak: 'break-word' } }, settingsStorage.getItem('projects')),
      Text({ paragraph: true, style: { wordBreak: 'break-word' } }, settingsStorage.getItem('debug')),
      Text({ paragraph: true, style: { wordBreak: 'break-word' } }, settingsStorage.getItem('items')),
    ])
  },
})
