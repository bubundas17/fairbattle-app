const LocalStorage = window.localStorage;
import {FCM} from 'capacitor-fcm'

const fcm = new FCM();
let packege = require("../package");

export const state = () => ({
  user: {},
  loggedIn: false,
  banned: false,
  token: null,
  pubgUsername: '',
  ver: packege.version,
  settings: {
    release: {
      value: packege.version,
      meta: {}
    }
  }
});

export const mutations = {
  token: (state, payload) => {
    state.token = payload;
    LocalStorage.setItem('token', payload)
  },

  settings: (state, payload) => {
    state.settings = payload;
  },

  user: (state, payload) => {
    state.user = {...state.user, ...payload}
  },
  addMoney(state, payload) {
    state.user.credits += parseInt(payload)
  },
  loggedIn(state, payload) {
    state.loggedIn = payload
  },
  addTransaction(state, payload) {
    state.transactions.unshift(payload)
  },
  pubgUsername(stste, payload) {
    stste.pubgUsername = payload
  }
};

export const actions = {
  async nuxtClientInit({commit, getters}, context) {
    this.$axios.setToken(getters['token'], 'Bearer');
    let settings = await this.$axios.$get("/");
    commit("settings", settings.data);
    if (!getters['token']) return;
    try {
      let user = await this.$axios.$get('/auth/profile');
      commit('user', user.user);
      commit('loggedIn', true);
      fcm.subscribeTo({topic: user.user._id})
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          commit('token', null);
          commit('loggedIn', false)
        }
      }
    }
  },

  async updateProfile({getters, commit}, payload) {
    return new Promise((resolve, reject) => {
      commit('user', payload)
      setTimeout(() => {
        return resolve()
      }, 500)
    })
  },
  async addMoney({getters, commit}, payload) {
    commit('addMoney', payload)
    // commit('addTransaction', {
    //   name: 'Added Money',
    //   status: 1,
    //   amount: payload,
    //   note: 'money added via UPI',
    //   date: new Date()
    // })
    return true
  },
  async withdrawalMoney({getters, commit}, payload) {
    commit('addMoney', -payload.amount)
    commit('addTransaction', {
      name: 'Money withdrawn',
      status: 1,
      amount: -parseInt(payload.amount),
      note: 'money added via UPI, to ' + payload.upi,
      date: new Date()
    });
    return true
  },
  async login({getters, commit}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await this.$axios.$post('/auth/login', {...payload})
        commit('token', user.token)
        this.$axios.setToken(user.token, 'Bearer')
        user = await this.$axios.$get('/auth/profile')
        commit('user', user.user)
        commit('loggedIn', true)
        resolve('User Logged In!')
      } catch (e) {
        console.log(e)
        reject('Invalid Username or Password.')
      }
    })
  },

  logout({getters, commit}) {
    commit('token', null)
    commit('loggedIn', false)
    commit('user', {})
  },

  token({getters, commit}, payload) {
    commit('token', payload)
    this.$axios.setToken(payload, 'Bearer')
  },
  async reloadProfile({getters, commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await this.$axios.$get('/auth/profile')
        commit('user', user.user)
        commit('loggedIn', true)
        resolve('User Logged In!')
      } catch (e) {
        reject('Please Login First')
      }
    })
  }

};

export const getters = {
  updateAvailable(state) {
    return state.ver < state.settings.release.value;
  },
  appLatestVersion(state) {
    return state.settings.release.value;
  },
  appUpdateRequired(state) {
    return state.ver < state.settings.release.value && state.settings.release.meta.required;
  },
  latestReleaseInfo(state){
    return state.settings.release;
  },
  pubgUsername(state) {
    return state.pubgUsername
  },
  token(state) {
    return state.token || LocalStorage.getItem('token')
  },

  user: state => {
    return state.user
  },
  matches: state => {
    return state.matches.map((val) => {
      let canJoin = val.joined < val.maxPlayers
      let progress = ((val.joined / val.maxPlayers) * 100)
      return {
        canJoin,
        progress,
        ...val
      }
    })
  },
  transactions: state => {
    return state.transactions.map(data => {
      let statusTxt = null
      let statusColor = null
      switch (data.status) {
        case 1:
          statusTxt = 'SUCCESS'
          statusColor = 'green darken-4'
          break
        case 2:
          statusTxt = 'PROCESSING'
          statusColor = 'yellow darken-4'
          break
        case 3:
          statusTxt = 'FAILED'
          statusColor = 'deep-orange darken-4'
          break
        default:
          statusTxt = 'FAILED'
          statusColor = 'deep-orange darken-4'
          break
      }
      return {
        statusTxt,
        statusColor,
        ...data
      }
    })
  },
  isLoggedIn(state) {
    return state.loggedIn
  }
}


