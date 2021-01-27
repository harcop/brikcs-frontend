import axios from 'axios'
export const state = () => ({
  counter: 50,
  auth: {},
  brand: {},
  wallet: {}
})

export const mutations = {
  increment (state) {
    state.counter += 1
  },
  setAuth (state) {
    state.auth.authentication = true
  },
  setToken (state, { token }) {
    state.auth.token = token
  },
  setUserData (state, { userData }) {
    state.auth.userData = userData
  },
  setBrand (state, { brand }) {
    state.brand = brand
  },
  setWallet (state, { wallet }) {
    state.wallet = wallet
  }
}

export const getters = {
  getToken: (state) => {
    return state.auth.token
  },
  getUserData: (state) => {
    return state.auth.userData
  },
  getBrand: (state) => {
    return state.brand
  },
  getWallet: (state) => {
    return state.wallet
  }
}
