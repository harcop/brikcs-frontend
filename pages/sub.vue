<template>
  <div>
    <v-row>
      <v-col
        v-for="(game, index) in games"
        :key="index"
        cols="6"
        md="2"
        sm="3"
        @click="navigateRoute()"
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
            <p>{{ game.name }}</p>
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
      games: [
        {
          name: 'hello-world',
          status: true
        },
        {
          name: 'Array',
          status: false
        },
        {
          name: 'Hash',
          status: true
        },
        {
          name: 'Include',
          status: false
        },
        {
          name: 'Pop',
          status: false
        }
      ],
      categoryId: ''
    }
  },
  fetch () {
    this.categoryId = this.$store.getters.getCategoryId
    this.fetchCategoryLevel()
  },
  methods: {
    navigateRoute () {
      this.$router.push('/code')
    },
    fetchCategoryLevel () {
      const url = `http://localhost:3280/api/level/view?category=${this.categoryId}`
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
</style>
