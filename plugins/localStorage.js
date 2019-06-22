import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  // window.onNuxtReady(() => {
  try {
    createPersistedState({
      key: 'storage',
      paths: [
        'token',
        'loggedIn',
        'pubgUsername'
      ]
    })(store)
  } catch (e) {
    console.log('Local Storage Not Available')
  }

  // })
}
