<template>
  <div>
    <v-row class="mt-10">
      <v-col mobile="false" style="background-color:#2d2d2d">
        <div class="d-flex align-center justify-center" style="height:100%">
          <div class="text-center">
            <h1>Welcome Back !</h1>
            <v-subheader> stay connected with you customer and people</v-subheader>
            <div>
              <nuxt-link to="login">
                <v-btn rounded class="px-15 py-5">
                  SIGN IN
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
              <h1>Create Account</h1>
              <v-subheader>connect with lovely customers</v-subheader>
            </div>
          </div>
          <div>
            <v-text-field
              v-model="registerForm.fullName"
              prepend-inner-icon="mdi-account"
              background-color="#2d2d2d"
              solo
              dense
              label="Full Name"
            />
            <v-text-field
              v-model="registerForm.username"
              background-color="#2d2d2d"
              prepend-inner-icon="mdi-badge-account"
              solo
              dense
              label="Username"
            />
            <v-text-field
              v-model="registerForm.email"
              background-color="#2d2d2d"
              prepend-inner-icon="mdi-mail"
              solo
              dense
              label="email"
            />
            <v-text-field
              v-model="registerForm.phoneNumber"
              background-color="#2d2d2d"
              prepend-inner-icon="mdi-phone"
              solo
              dense
              label="e.g 2348105239873"
            />
            <v-text-field
              v-model="registerForm.password"
              background-color="#2d2d2d"
              prepend-inner-icon="mdi-form-textbox-password"
              solo
              dense
              :type="'password'"
              label="password"
            />
            <div class="d-flex justify-center">
              <v-btn rounded class="px-15 py-5" @click="register()">
                Register
              </v-btn>
            </div>
            <template v-if="errorBox">
              <p>{{ errorBox }}</p>
            </template>
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
      errorBox: '',
      registerForm: {
        fullName: 'Harcop',
        username: 'harcop',
        email: 'harcopdrew@gmail.com',
        phoneNumber: '2348117479505',
        password: 'Harcop123@'
      }
    }
  },
  methods: {
    register () {
      // for (const field of this.registerForm) {
      //   if (!field || field === '') {
      //     this.errorBox = 'please complet the form'
      //   }
      // }
      const url = 'https://mayasms.herokuapp.com/api/user/register'
      this.$axios.post(url, {
        fullName: this.registerForm.fullName,
        username: this.registerForm.username,
        email: this.registerForm.email,
        phoneNumber: this.registerForm.phoneNumber,
        password: this.registerForm.password
      })
        .then((response) => {
          const data = response.data
          console.log(data)
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
