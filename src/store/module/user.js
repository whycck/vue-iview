
import {
  login,
} from '@/api/user'

export default {
  state: {
    access: ''
  },
  actions: {
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(({ data }) => {
          commit('setToken', data.token)
          resolve()
        }).catth(err => {
          reject(err)
        })
      })
    }
  }
}
