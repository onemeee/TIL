import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    WantMovies: [],
    MovieList: null,
  },
  getters: {
  },
  mutations: {
    PUSHMOVIES(state, movie) {
      state.WantMovies.push(movie)
    },
    CHANGESELECT(state, movie) {
      const MovieIdx = state.WantMovies.indexOf(movie)
      state.WantMovies[MovieIdx].isselected = !state.WantMovies[MovieIdx].isselected
    },
    UPDATELIST(state, movies) {
      state.MovieList = movies
    }
  },
  actions: {
    PushMovies(context, message) {
      const movie = {
        'title': message,
        'isselected': false,
      }
      context.commit('PUSHMOVIES', movie)
    }
  },
  modules: {
  }
})
