import config from 'config/index'
import { createAPI } from 'create-api'

const http = createAPI(config)

/**
 * 获取首页行情列表
 */
const base = '/api/v1'
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
export const getUserInfo = (params) => http.get(base + '/user/current', params)

/**
 * 绑定邮箱
 */
export const getEmailCode = (params) => http.post(base + '/emails/code', params)

/**
 * 退出登入
 */
export const loginOut = (params) => http.post(base + '/tokens/current', params, 'delete')
