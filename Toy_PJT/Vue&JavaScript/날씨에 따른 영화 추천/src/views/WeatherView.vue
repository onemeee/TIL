<template>
  <div>
    <h1>{{weather.weather[0].description}}한 날씨엔 이런 영화 어때요?</h1>
    <div class="row">
      <div class="col-4"></div>
      <input class="col-4 btncolor" type="submit" value="PICK" @click="GetUrl">
      <div class="col-4"></div>
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
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'WeatherView',
  data() {
    return {
      appid: 'ab9306ccf50c90c636e9d5c0076b08ab',
      weather: null,
      weatherid: null,
      movie: null,
      check: false,
      movieUrl: null,
      newMovies: null,
      genres: null,
      movies: [],
   } 
  },
  methods: {
    GetWeather() {
      axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?q=Seoul,kor&appid=${this.appid}`
      })
      .then((response) => {
        this.weather = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    GetUrl() {
      this.weatherid = this.weather.weather[0].id
      if (this.weatherid<300) {
        this.genres = [10751, 53]
      }
      else if (this.weatherid<400) {
        this.genres = [18, 10749, 9648]
      }
      else if (this.weatherid<600) {
        this.genres = [10402, 80, 18]
      }
      else if (this.weatherid<700) {
        this.genres = [10751, 14, 10402]
      }
      else if (this.weatherid<800) {
        this.genres = [37, 10752, 53, 878, 80]
      }
      else {
        this.genres = [28, 12, 16, 35, 10751]
      }
      this.newMovies = this.movies.filter((movie) => {
        for (const id of movie.genre_ids) {
          if (this.genres.includes(id)) {
            return true
        }
      }
      })
      if ((this.newMovies.length) > 5) {
        this.movie = _.sample(this.newMovies)
        const url = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movie.poster_path}`
        this.movieUrl = url
        this.check =true
      } else {
        this.movie = _.sample(this.movies)
        const url = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movie.poster_path}`
        this.movieUrl = url
        this.check =true
      }
    },
    GetMovies() {
      for (let i=1 ; i<6 ; i++) {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/top_rated?api_key=148a323ad5ea9189287024e661d1e45c&watch_region=KR&language=ko&page=${i}`
        })
        .then((response) => {
          this.movies = this.movies.concat(response.data.results)
          // console.log(i, this.movies)
        })
        .catch((error) => {
          console.log(error)
        })
      }
  }
  },
  mounted() {
    this.GetWeather()
    this.GetMovies()
  }
}
</script>

<style>
  .btncolor {
    color: white;
    background-color: rgb(35, 127, 40);
    border: 0;
    border-radius: 5px;
  }
</style>