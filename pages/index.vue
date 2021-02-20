<template>
  <div class="main">
    <div class="main_c">
      <div>
        <p style="color: white">
          Choose your path
        </p>
      </div>
      <v-row>
        <!-- <v-col>
          <span>Loading</span>
        </v-col> -->
        <v-col>
          <v-row>
            <template
              v-if="!games.length"
            >
              <v-col
                v-for="n in 5"
                :key="n"
                md="4"
                xs="12"
                sm="6"
                cols="12"
              >
                <v-skeleton-loader
                  type="article"
                  v-bind="attrs"
                  style="border-radius: 7px; background: #262C3C;"
                />
              </v-col>
            </template>
            <v-col
              v-for="(game, index) in games"
              :key="index"
              md="4"
              xs="12"
              sm="6"
              cols="12"
              @click="navigateRoute(`${game.id}`)"
            >
              <div class="center-flex px-5 py-3" style="border-radius: 7px; background: #262C3C;">
                <div>
                  <div class="d-flex justify-center">
                    <span style="font-size:14px; color: #fafafa">{{ game.name }}</span>
                  </div>
                  <div class="center-flex my-2" style="position:relative">
                    <span class="fa-stack" style="font-size:25px">
                      <i style="color:#232734;" class="fa fa-circle fa-stack-2x" />
                      <i style="font-size:15px" class="fa fa-code fa-stack-1x fa-inverse" />
                    </span>
                    <div style="top: 50%; left: 55%; position:absolute; display:inline-block;" class="center-flex">
                      <span style="font-size:7px" class="fa fa-stack">
                        <i style="color:#00F9E5" class="fa fa-circle fa-stack-2x" />
                        <i v-if="game.status" style="color:#232734" :class="[`fa-${game.status}`]" class="fa fa-check fa-stack-1x fa-inverse" />
                        <i v-else style="color:#232734" :class="[`fa-${game.status}`]" class="fa fa-close fa-stack-1x fa-inverse" />
                      </span>
                    </div>
                  </div>
                  <div class="my-2">
                    <div class="center-flex px-2" style="font-size:12px; color: #00CAE6; border-radius:100px; background: #2A364F">
                      <span :style="{color:colorMaker(`${game.mode}`)}">{{ game.mode }}</span>
                      <span class="ml-1" style="color: #3E4E74"><i class="fa fa-cog" /></span>
                    </div>
                  </div>
                  <div class="center-flex">
                    <!-- <span class="" style="font-size:10px; color:#414C6D">Last run: {{ game.lastPlayed.substr(0,5) }}</span> -->
                  </div>
                </div>
              </div>
            </v-col>
            <v-col class="d-flex align-center justify-center" style="color: rgba(37,43,63,0.5)">
              <div>
                <p>Coming Soon</p>
                <div class="d-flex align-center justify-center">
                  <i class="fa fa-refresh fa-4x" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div>
      <div class="notify-card mt-10 pa-5" style="background: #272c3c; color: #5d698f; border-radius:5px">
        <p>Brikcs Academy is an online developer builder: we provide tutorials and coding challenges to help newbies get their hands dirty quickly <i class="fa fa-code" /><br><br>The industry grows every minute and we are limited by the information we are exposed to which is why we make available a platform that developers can come and see all in one what new technology is trending <i class="fa fa-code" /><br><br> As we build the platfrom using our known tools we plan to make it also make this available to experienced developers out there to help us build the community and make it grow better <i class="fa fa-code" /><br> </p>
      </div>
    </div>
    <div>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          max-width="290"
        >
          <v-card>
            <div class="d-flex justify-center align-center">
              <span>Please Sign in</span>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      attrs: {
        loading: true
      },
      col: 'red',
      Oldgames: [
        {
          name: 'Basic',
          mode: 'Easy',
          totalPlayer: 3211,
          lastPlayed: 'Today',
          status: 'check'
        },
        {
          name: 'Challenge',
          mode: 'Medium',
          totalPlayer: 3211,
          lastPlayed: 'Today',
          status: 'check'
        },
        {
          name: 'git',
          mode: 'Easy',
          totalPlayer: 2910,
          lastPlayed: '2 days ago',
          status: 'close'
        },
        {
          name: 'docker',
          mode: 'Hard',
          totalPlayer: 1480,
          lastPlayed: 'few minute ago',
          status: 'close'
        },
        {
          name: 'Firebase',
          mode: 'Hard',
          totalPlayer: 2180,
          lastPlayed: 'few minute ago',
          status: 'close'
        }
      ],
      games: [],
      authenticated: false
    }
  },
  fetch () {
    this.loadCategory()
  },
  methods: {
    colorMaker (mode) {
      const colorMode = {
        easy: '#00F9E5',
        medium: 'yellow',
        hard: '#FF7A00'
      }
      return colorMode[mode.toLowerCase()]
    },
    navigateRoute (id) {
      this.authenticated = this.$store.getters.getAuth
      if (!this.authenticated) {
        this.dialog = true
      } else {
        this.$store.commit('setCategoryId', { categoryId: id })
        this.$router.push('/sub')
      }
    },
    loadCategory () {
      const url = '/category/view'
      this.$axios.get(url)
        .then((result) => {
          const { data } = result
          const { response } = data
          this.games = response
        })
    }
  }
}
</script>

<style>
.main {
  background: #1F2330;
}
.center-flex {
  display: flex;
  justify-content: center;
}
.v-skeleton-loader__article {
  background: #262C3C !important;
}
</style>
