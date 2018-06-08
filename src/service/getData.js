import config from 'config/index'
import { createAPI } from 'create-api'

const http = createAPI(config)

/**
 * 获取首页行情列表
 */
const base = '/api/v1'
// const mock = '/v1'
export const getCoinList = () => http.get(base + '/market/ticker', {
})

/**
 * 获取滑动验证的参数
 */
export const getGreetest = () => http.get(base + '/tokens/geeTestInit', {
})

/**
 * 发送验证码
 */
export const sendSMS = (params) => http.post(base + '/tokens/sms', params)

/**
 * 注册
 */
export const regist = (params) => http.post(base + '/tokens/mobiles', params)

/**
 * 登入
 */
export const accounts = (params) => http.post(base + '/tokens/accounts', params)

/**
 * 获取用户信息
 */
export const getUserInfo = (params) => http.get(base + '/users/current', params)

/**
 * 发送邮箱验证码
 */
export const getEmailCode = (params) => http.post(base + '/emails/bind/code', params)
/**
 * 绑定邮箱
 */
export const bindEmail = (params) => http.post(base + '/emails/bind/verify', params)

/**
 * 退出登入
 */
export const loginOut = (params) => http.post(base + '/tokens/current', params, 'delete')

/**
 * 找回密码发送短信验证码
 */
export const resetSendSMS = (params) => http.post(base + '/tokens/sms/reset', params)

/**
 * 找回密码发送邮箱验证码
 */
export const resetEmailSendSMS = (params) => http.post(base + '/emails/reset/code', params)
