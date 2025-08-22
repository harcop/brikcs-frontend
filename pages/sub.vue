<template>
  <div>
    <v-row>
      <template
        v-if="!games.length"
      >
        <v-col
          v-for="n in 5"
          :key="n"
          cols="6"
          md="2"
          sm="3"
        >
          <v-skeleton-loader
            type="list-item-three-line"
            v-bind="attrs"
            style="border-radius: 7px; background: #262C3C;"
          />
        </v-col>
      </template>
      <v-col
        v-for="(game, index) in games"
        :key="index"
        cols="6"
        md="2"
        sm="3"
        @click="navigateRoute(game.id)"
      >
        <div>
          <div class="game-card d-flex justify-center py-3 px-3" style="position:relative; background: #262C3C;">
            <span style="font-size:50px; font-weight:bold; color: #585D7B">{{ index + 1 }}</span>
            <div style="position: absolute; top: 70%; right: 0%">
              <span class="fa-stack">
                <i style="color:#585D7B" class="fa fa-circle fa-stack-2x" />
                <template v-if="game.status">
                  <i style="color:#262C3C" class="fa fa-unlock fa-stack-1x fa-inverse" />
                </template>
                <template v-else>
                  <i style="color:#FF7A00" class="fa fa-lock fa-stack-1x fa-inverse" />
                </template>
              </span>
            </div>
          </div>
          <div class="d-flex justify-center" style="color: #eaeaea">
            <p>{{ game.title }}</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      attrs: {
        loading: true
      },
      Oldgames: [
        {
          title: 'hello-world',
          status: true
        },
        {
          title: 'Array',
          status: false
        },
        {
          title: 'Hash',
          status: true
        },
        {
          title: 'Include',
          status: false
        },
        {
          title: 'Pop',
          status: false
        }
      ],
      games: [],
      categoryId: ''
    }
  },
  fetch () {
    if (this.$store.getters.getCategoryId === '') {
      this.$router.push('/')
    }
    this.categoryId = this.$store.getters.getCategoryId
    this.fetchCategoryLevel()
  },
  methods: {
    navigateRoute (levelId) {
      console.log(levelId, 'moving levelId...')
      this.$store.commit('setLevelId', { levelId })
      this.$router.push('/code')
    },
    fetchCategoryLevel () {
      const url = `/level/view-user-level/${this.categoryId}`
      const headers = this.$store.getters.getHeader
      this.$axios.get(url, { headers })
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
.game-card {
  border-radius: 5px;
  background: red;
}
.v-skeleton-loader__bone {
  background: #262C3C !important;
}
</style>
