export const state = () => ({
  authenticated: false,
  userDetail: {},
  token: '',
  headers: {},
  categoryId: '',
  levelId: ''
})

export const mutations = {
  setUserDetail (state, { userDetail }) {
    state.userDetail = userDetail
  },
  setAuth (state, { token }) {
    state.authenticated = true
    state.token = token
    state.headers = {
      authorization: `Bearer ${token}`
    }
  },
  setCategoryId (state, { categoryId }) {
    state.categoryId = categoryId
  },
  setLevelId (state, { levelId }) {
    state.levelId = levelId
  },
  removeAuth (state) {
    state.authenticated = false
    state.userDetail = {}
    state.token = ''
    state.headers = {}
  }
}

export const getters = {
  getAuth (state) {
    return state.authenticated
  },
  getUserDetail (state) {
    return state.userDetail
  },
  getToken (state) {
    return state.token
  },
  getHeader (state) {
    return state.headers
  },
  getCategoryId (state) {
    return state.categoryId
  },
  getLevelId (state) {
    return state.levelId
  }
}
