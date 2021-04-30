import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { showScreenLoading, hideScreenLoading } from './loading'
import msg from './message'
import qs from 'qs'
import store from '@/store'
import { getToken } from '@/utils/auth'
// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const pending = []
const cancelToken = axios.CancelToken
const removePending = (config, type) => {
  for (let i = 0; i < pending.length; i++) {
    /*  console.log(pending[i].url, config.url + '&' + config.method)
      console.log((config.url + '&' + config.method).indexOf(pending[i].url) !== -1)
      console.log(pending, type, config)*/
    if ((config.url + '&' + config.method).indexOf(pending[i].url) !== -1) { // 当当前请求在数组中存在时执行函数体
      pending[i].fun() // 执行取消操作
      pending.splice(i, 1) // 把这条记录从数组中移除
      if (type === 'req') {
        msg.error('小老弟不要重复请求!!')
      }
    }
  }
}

const ax = axios.create({
  timeout: 20000,
  baseURL: 'http://localhost:8181/'

})

ax.defaults.retry = 3
ax.defaults.retryDelay = 500
let reConfig = ''
let reData = ''
// 添加请求拦截器
ax.interceptors.request.use(
  config => {
    if (config.headers.showLoading !== false) {
      showScreenLoading()
    }

    //设置token
    if (getToken()) {
      config.headers.token = getToken()
    }

    if (config.headers.stringify !== false) {
      config.data = qs.stringify(config.data)
    }

    removePending(config, 'req') // 在一个ajax发送前执行一下取消操作

    config.cancelToken = new cancelToken((cancel) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ url: config.url + '&' + config.method, fun: cancel })
    })
    return config
  },
  err => {
    const config = err.config

    // 判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading !== false) {
      hideScreenLoading()
    }
    // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    removePending(err.config, 'req-e')
    msg.error('向服务器请求超时,请检查网络或联系管理员!')
    return Promise.reject(err)
  })

ax.interceptors.response.use(
  response => {

    const res = response.data
    if (response.config.headers.showLoading !== false) {
      hideScreenLoading()
    }
    // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    removePending(response.config, 'resp')
    // if the custom code is not 20000, it is judged as an error.

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;50020:需要重新登录
    if (res.code === 50008 || res.code === 50012) {
      // to re-login
      MessageBox.confirm('您已登出，可以取消停留在此页面上，或者再次登录', '确认登出', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (res.code === 50014) {
      store.dispatch('user/refreshToken').then(res => {
          console.log(response.config)
          if (response.config.url !== 'user/check')
            msg.warning('请求失败,请再次尝试上一步操作!')
        }
      ).catch(err => new Promise.reject(err))

    }
    return response
  }, err => {
    hideScreenLoading()
    const config = err.config

    // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    removePending(config, 'resp-e')

    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err)

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0

    // Check if we've maxed out the total number of retries
    /* if (config.__retryCount >= config.retry) {
       // Reject with the error

       MessageBox.alert('重试次数已达上限,请检查网络或联系管理员!', '提示', {
         center: true,
         type: 'error',
         f: hideScreenLoading()
       }).then()
       return Promise.reject(err)
     }*/
    // Increase the retry count
    config.__retryCount += 1

    /* if (config.headers.noRetry !== false) {
       MessageBox.confirm('请求超时是否重试?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         center: true,
         type: 'error',
         f: hideScreenLoading()
       })
         .then(() => {
           return new Promise(resolve => {
             setTimeout(function () {
               resolve()
             }, config.retryDelay)
           })
             // Return the promise in which recalls axios to retry the request
             .then(() => {
               if (config.headers.showLoading !== false) {
                 showScreenLoading({ text: '正在重试......' })
               }
               return ax(config)
             })

         })
       // Create new promise to handle exponential backoff
     } else {*/
    msg.error('服务器响应超时,请检查网络或联系管理员!')
    return Promise.reject('服务器响应超时,请检查网络或联系管理员!')

  })

export default ax

