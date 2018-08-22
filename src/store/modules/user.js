import { login, logout, getInfo } from '@/api/login'
import { refreshToken, changePwd } from '@/api/user'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    refreshToken: getRefreshToken(),
    exptime: null,
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    SET_EXPTIME: (state, exptime) => {
      state.exptime = exptime
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          setRefreshToken(data.refreshToken)
          commit('SET_TOKEN', data.token)
          commit('SET_REFRESH_TOKEN', data.refreshToken)
          commit('SET_EXPTIME', data.exptime)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.nickName)
          commit('SET_AVATAR', data.headPortrait === null ? '' : data.headPortrait)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    setAvatar({ commit }, avatar) {
      commit('SET_AVATAR', avatar)
    },

    // 修改密码
    ChangPwd({ commit }, parmas) {
      return new Promise((resolve, reject) => {
        changePwd(parmas, true).then(res => {
          Message({
            message: res.message,
            type: 'success',
            duration: 5 * 1000
          })
          commit('SET_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_EXPTIME', null)
          commit('SET_ROLES', [])
          removeToken()
          removeRefreshToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 刷新refreshtoken
    GetRefreshToken({ commit, state }) {
      commit('SET_TOKEN', null)
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken).then(response => {
          const data = response.data
          setToken(data.token)
          setRefreshToken(data.refreshToken)
          commit('SET_TOKEN', data.token)
          commit('SET_REFRESH_TOKEN', data.refreshToken)
          commit('SET_EXPTIME', data.exptime)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_EXPTIME', null)
          commit('SET_ROLES', [])
          removeToken()
          removeRefreshToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_EXPTIME', null)
        removeToken()
        removeRefreshToken()
        resolve()
      })
    }
  }
}

export default user
