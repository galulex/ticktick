const { settingsStorage: storage } = settings

export const xhr = async (url, method, headers, body = undefined) => {
  // return { response: stub, status: 200 }
  try {
    storage.setItem('debug', `API: ${url} ${JSON.stringify(headers)} start`)
    res = await fetch({ url, method, headers, body })
    storage.setItem('debug', `API: ${url}` + res.status)
    if (!res.ok) return { status: res.status, error: res.body }

    const data = typeof res.body === 'string' ?  JSON.parse(res.body) : res.body
    return data
  } catch (error) {
    storage.setItem('debug', `JS ERROR: ${url} ${error}`)
    return { error: `JS error: ${error}`, status: '0' }
  }
}

export const store = {
  get code() { return storage.getItem('code') },
  get refresh_token() { return storage.getItem('refresh_token') },
  get access_token() { return storage.getItem('access_token') },
  get project_id() { return storage.getItem('project_id') },
  set project_id(id) { return storage.setItem('project_id', id) },
  get projects() { return JSON.parse(storage.getItem('projects') || '[]') },
  set projects(data) { return storage.setItem('projects', JSON.stringify(data)) },
  get tasks() { return JSON.parse(storage.getItem('tasks') || '[]') },
  set tasks(data) { return storage.setItem('tasks', JSON.stringify(data)) },
  setItem: (item, value) => storage.setItem(item, value),
  removeItem: item => storage.removeItem(item),
  getItem: item => storage.getItem(item),
}

const stub = {
}
