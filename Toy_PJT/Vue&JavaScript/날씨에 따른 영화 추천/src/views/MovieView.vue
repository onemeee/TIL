<template>
  <div class= "row row-cols-1 row-cols-md-3 g-4">
    <MovieCard
    v-for="(movie,index) in movies"
    :key="index"
    :movie="movie"/>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    MovieCard,
  },
  data() {
    return {
      movies : []
    }
  },
  methods: {
    GetMovies() {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=자신의api_keyc&watch_region=KR&language=ko&page=1'
      })
      .then((response) => {
        this.movies = response.data.results
        this.$store.commit('UPDATELIST', this.movies)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  },
  created() {
    this.GetMovies()
  }
}
</script>
