import Cookies from 'js-cookie'
import config from '@/config'
import { hasOneOf } from '@/libs/tools'

const {
  cookieExpires,
  title
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

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @param {*} access
 */
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

/**
 * 从URL中解析参数
 * @param {String} url
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  const params = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    params[keyValue[0]] = keyValue[1]
  })
  return params
}

/**
 * @param {Array} access 用户数组权限 eg: ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  return true
}

/**
 * @param {String} name
 * @param {Array} access
 * @param {Array} routes
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = list => {
    return list.some(item => {
      if (item.children && item.children.length) return routePermissionJudge(item.children)
      else if (item.name === name) return hasAccess(access, item)
    })
  }
  return routePermissionJudge(routes)
}

export const setTitle = (routeItem, vm) => {
  const pageTitle = showTitle(routeItem, vm)
  const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  window.document.title = resTitle
}
