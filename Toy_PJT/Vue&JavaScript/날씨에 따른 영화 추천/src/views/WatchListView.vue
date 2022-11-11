<template>
  <div>
    <WatchListForm/>
    <WatchListItem
    v-for="(movie, idx) in WantMovies"
    :key="idx"
    :movie="movie"/>
  </div>
</template>

<script>
import WatchListForm from '@/components/WatchListForm'
import WatchListItem from '@/components/WatchListItem'
export default {
  name: 'WatchListView',
  components: {
    WatchListItem,
    WatchListForm
  },
  computed: {
    WantMovies() {
      return this.$store.state.WantMovies
    }
  }
}
</script>

<style>

</style>