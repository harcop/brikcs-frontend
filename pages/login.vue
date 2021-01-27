<template>
  <div>
    <v-row class="mt-10">
      <v-col mobile="false" style="background-color:#2d2d2d">
        <div class="d-flex align-center justify-center" style="height:100%">
          <div class="text-center">
            <h1>Welcome!</h1>
            <v-subheader> stay connected with you customer and people</v-subheader>
            <div>
              <nuxt-link to="/register">
                <v-btn rounded class="px-15 py-5">
                  SIGN UP
                </v-btn>
              </nuxt-link>
            </div>
          </div>
        </div>
      </v-col>
      <v-col style="background-color:#1f1f1f">
        <div>
          <div class="d-flex justify-center">
            <div class="text-center">
              <h1>LOGIN</h1>
              <v-subheader>to start bonding</v-subheader>
            </div>
          </div>
          <div>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                background-color="#2d2d2d"
                prepend-inner-icon="mdi-badge-account"
                solo
                dense
                required
                :rule="nameRules"
                label="Username / email"
              />
              <v-text-field
                v-model="password"
                background-color="#2d2d2d"
                prepend-inner-icon="mdi-form-textbox-password"
                solo
                required
                :type="'password'"
                dense
                label="password"
              />
              <div class="d-flex justify-center">
                <v-btn type="submit" rounded class="px-15 py-5">
                  Login
                </v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data () {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(this.$store.state.counter, 'counter')
      this.$store.commit('increment')
      const url = 'https://mayasms.herokuapp.com/api/user/login'
      this.$axios.post(url, {
        username: this.username,
        password: this.password
      })
        .then((response) => {
          const data = response.data
          const { token, response: _response } = data
          const { id: userId } = _response
          this.$store.commit('setAuth')
          this.$store.commit('setToken', { token })
          this.$store.commit('setUserData', { userData: { userId } })
          this.$router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
