export const STORAGE_KEY = {
  JWT: 'JWT',
}

export default class StorageUtil {
  static get = (key) => {
    try {
      const setValue = localStorage.getItem(key) || ''
      return JSON.parse(setValue)
    } catch {
      return ''
    }
  }

  static set = (key, value) => {
    try {
      return localStorage.setItem(key, JSON.stringify(value))
    } catch {
      return ''
    }
  }

  static remove = (key) => {
    localStorage.removeItem(key)
  }
}
