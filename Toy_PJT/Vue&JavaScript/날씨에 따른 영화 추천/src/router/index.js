import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '@/views/MovieView'
// import RandomView from '@/views/RandomView'
import WeatherView from '@/views/WeatherView'
import WatchListView from '@/views/WatchListView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/movies',
    name: 'movies',
    component: MovieView,
  },
  {
    path: '/random',
    name: 'random',
    // component: RandomView
    component: WeatherView
  },
  {
    path: '/watch-list',
    name: 'watch-list',
    component: WatchListView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
