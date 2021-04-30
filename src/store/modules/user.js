import { login, logout, getInfo, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth_refresh'
import { resetRouter } from '@/router'
import store from '@/store'
import ax from '@/utils/axios'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    username: '',
    avatar: '',
    id: '',
  }
}

const refresh = setInterval(() => {
  ax.post('user/alive-status', {}, { headers: { showLoading: false } }).then().catch()
}, 240000)

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  },

}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_NAME', data.name)
        commit('SET_USERNAME', data.username)
        commit('SET_AVATAR', data.avatar)
        commit('SET_ID', data.id)
        commit('SET_TOKEN', data.token)
        setRefreshToken(data.refresh_token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(getToken()).then(response => {
        const { data } = response
        if (!data.username || !data.id) {
          return reject('验证失败，请重新登录。')
        }
        commit('SET_NAME', data.name)
        commit('SET_USERNAME', data.username)
        commit('SET_AVATAR', data.avatar)
        commit('SET_ID', data.id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeRefreshToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshToken ({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken({ token: getRefreshToken(), username: state.username }).then(res => {
        if (res.data.code === 20000) {
          setToken(res.data.token)
          setRefreshToken(res.data.refresh_token)
          commit('SET_TOKEN', res.data.token)
        } else if (res.data.code === 50020) {
          store.dispatch('user/resetToken').then().catch()
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeRefreshToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

