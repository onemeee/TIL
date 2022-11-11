<template>
  <div>
    <input type="submit" value="클릭!" @click="GetUrl">
    <br>
    <br>
    <div class="row">
      <div class="col-4"></div>
    <div class="col-4 card mb-3" v-if="check">
      <img :src="movieUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">{{ movie.title }}</h3>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'RandomView',
  data() {
    return {
      movie: null,
      check: false,
      movieUrl: null
    }
  },
  computed: {
    GetMovies() {
      return this.$store.state.MovieList
      }
  },
  methods: {
    GetUrl() {
      this.movie = _.sample(this.GetMovies)
      const url = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movie.poster_path}`
      this.movieUrl = url
      this.check =true
    }
  },
}
</script>

<style>

</style>