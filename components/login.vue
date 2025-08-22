<template>
  <div>
    <span @click="login()">Sign in with <i class="fa fa-google" />oogle</span>
    <div />
  </div>
</template>

<script>

export default {
  data () {
    return {
      provider: '',
      init: ''
    }
  },
  mounted () {

  },
  methods: {
    firebaseInit () {
    // eslint-disable-next-line no-undef
      if (!firebase.apps.length) {
        const config = JSON.parse(process.env.firebaseConfig)
        // eslint-disable-next-line no-undef
        firebase.initializeApp(config)
      }
      // eslint-disable-next-line no-undef
      this.provider = new firebase.auth.GoogleAuthProvider()
    },
    login () {
      this.firebaseInit()
      this.googleSignInPopup(this.provider)
    },
    googleSignInPopup (provider) {
      // eslint-disable-next-line no-undef
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          // const credential = result.credential

          // This gives you a Google Access Token. You can use it to access the Google API.
          // const token = credential.accessToken
          // The signed-in user info.
          const user = result.user
          this.$store.commit('setUserDetail', { userDetail: user.providerData[0] })
          console.log(user, 'user')
          const { email } = user
          const url = '/user/load-user'
          return this.$axios.post(url, { email })
        })
        .then((result) => {
          const { data } = result
          const { token } = data
          this.$store.commit('setAuth', { token })
          this.$emit('login')
        })
        .catch((error) => {
          // Handle Errors here.
          // const errorCode = error.code
          // const errorMessage = error.message
          // The email of the user's account used.
          // const email = error.email
          // The firebase.auth.AuthCredential type that was used.
          // const credential = error.credential
          // ...
          console.log(error)
        })
      // [END auth_google_signin_popup]
    }
  }
}
</script>

<style>

</style>
