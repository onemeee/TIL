<template>
<div class="col">
  <div class="card h-100">
    <img :src="MovieUrl" class="card-img-top" alt="...">
    <div class="card-body" @click="ShowOver">
      <h5 class="card-title">{{movie.title}}</h5>
      <p class="card-text">{{OverView}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'MovieCard',
  data() {
    return {
      check: false,
    }
  },
  props: {
    movie: Object
  },
  methods: {
    ShowOver() {
      this.check = !this.check
    }
  },
  computed: {
    MovieUrl() {
      const movieUrl = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movie.poster_path}`
      return movieUrl  
    },
    OverView() {
      let overview
      if (this.check === true) {
        overview = this.movie.overview
        return overview
      } else {
        overview = this.movie.overview.substr(0, 72) + '...'
        return overview
      }
    }
  }
}
</script>

<style>

</style>