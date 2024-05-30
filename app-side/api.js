import { xhr, store } from './utils'
const { setItem, getItem } = store

const URL = 'https://api.ticktick.com/'

const R = {
  get HEADERS() {
    return {
      Authorization: `Bearer ${store.access_token}`,
      'Content-Type': 'application/json',
    }
  },
}

const path = path => `${URL}${path}`

const projects = async () => {
  const response = await xhr(path('open/v1/project'), 'GET', R.HEADERS)
  store.projects = response
  return response
}

const tasks = async () => {
  const response = await xhr(path(`open/v1/project/${store.project_id}/tasks`), 'GET', R.HEADERS)
  store.tasks = response
  return response
}

const createProject = async () => {
  const response = await xhr(path('open/v1/project'), 'POST', R.HEADERS, { name: 'Test Project' })
  return response
}

const Api = {
  projects: {
    index: projects,
    create: createProject,
  },
}

export default Api
