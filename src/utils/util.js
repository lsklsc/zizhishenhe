import axios from 'axios'
import {
  baseUrl,
  devUrl
} from '@/common/common'
let util = {}

const ajaxUrl = process.env.NODE_ENV === 'development'
  // 测试环境api接口
  ?
  baseUrl
  // 线上环境api接口
  :
  devUrl

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 50000
})
util.newAjax = axios.create({
  baseURL: 'http://ljflbasedata.ztbory.com',
  // baseURL: 'http://172.16.1.23:8568',
  timeout: 50000
})

util.api = ajaxUrl
util.oauthUrl = ajaxUrl

export default util
