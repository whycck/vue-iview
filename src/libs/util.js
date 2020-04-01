import Cookies from 'js-cookie'
import config from '@/config'
import { hasOneOf, objEqual } from '@/libs/tools'

const {
  title,
  cookieExpires,
} = config

export const TOKEN_KEY = 'token'

export const setToken = token => Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const hasChild = item => item.children && item.children.length !== 0

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}

export const getMenuByRouter = (list, access) => {
  const res = []
  list.forEach(item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      const obj = {
        icon: (item.meta && item.meta.icon),
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

export const showTitle = item => {
  const { title } = item.meta
  return title || item.name
}
