import Mock from 'mockjs'
import { login, getUserInfo } from './login'
// 配置ajax请求延迟，可用来测试网络延迟大时项目中的效果
Mock.setup({
  timeout: 1000
})

// 登陆相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)

export default Mock
