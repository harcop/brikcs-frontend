<template>
  <v-app>
    <div class="d-flex justify-space-between nav-bar-header">
      <div class="d-flex align-center" style="color: #3B4562">
        <div class="d-flex justify-center pa-3 " style="background:#2C344C; width: 40px;">
          <i class="fa fa-align-center" />
        </div>
        <span class="ml-3" style="font-weight:bold">Brikcs Acad</span>
      </div>

      <div class="mt-2 mr-5 menu_attr" style="color:#585D7B">
        <template v-if="authenticated">
          <div class="d-flex align-center">
            <span class="">Welcome {{ userDetail.displayName.split(" ")[0] }}</span>
            <div class="mr-3 ml-1 mt-1">
              <img :src="userDetail.photoURL" width="15px" style="border-radius:100px">
            </div>
            <v-menu
              class="v-main-menu"
              bottom
            >
              <template #activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                >

                  <i class="fa fa-bars" />
                  Menu</span>
              </template>
              <v-list class="menu-list">
                <v-list-item>
                  <nuxt-link to="/">
                    <v-list-item-title>Home</v-list-item-title>
                  </nuxt-link>
                </v-list-item>
                <v-list-item @click="logout()">
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
        <template v-else>
          <!-- <span @click="login()">Login</span> -->
          <login @login="fetchData" />
        </template>
      </div>
    </div>
    <v-main>
      <div class="main_container">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import login from '~/components/login.vue'
export default {
  components: {
    login
  },
  data () {
    return {
      userDetail: {},
      authenticated: false
    }
  },
  fetch () {
    this.fetchData()
  },
  methods: {
    getUserDetail () {
      this.userDetail = this.$store.getters.getUserDetail
    },
    getAuthentication () {
      this.authenticated = this.$store.getters.getAuth
    },
    fetchData () {
      this.getUserDetail()
      this.getAuthentication()
      console.log(this.authenticated, this.userDetail, 'data everywhere')
    },
    logout () {
      const config = JSON.parse(process.env.firebaseConfig)
      console.log(config, 'key')
      // eslint-disable-next-line no-undef
      if (!firebase.apps.length) {
        // eslint-disable-next-line no-undef
        firebase.initializeApp(config)
      }
      // eslint-disable-next-line no-undef
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        this.$store.commit('removeAuth')
        this.fetchData()
        this.$router.push('/')
      }).catch((error) => {
        // An error happened.
        console.log(error)
      })
    }
  }
}
</script>

<style>
.v-application {
  background: #1F2330 !important;
}
.nav-bar-header {
  background: #272D3D
}
.main_container {
  padding: 20px;
}
.menu_attr {
  cursor: pointer;
}
.v-main-menu {
  z-index: 25 !important;
}
</style>
