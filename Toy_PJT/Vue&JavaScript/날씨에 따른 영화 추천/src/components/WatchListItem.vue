<template>
  <!-- <div> -->
    <div @click="CheckMovie" :class="{ 'is-selected': movie.isselected }">
    {{movie.title}}
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'WatchListItem',
  props: {
    movie: Object
  },
  methods: {
    CheckMovie() {
      this.$store.commit('CHANGESELECT', this.movie)
    }
  }
}
</script>

<style>
  .is-completed {
    text-decoration: 2px line-through gray;
  }
  .is-selected {
    background-color: rgb(224, 224, 224);
    text-decoration: 2px line-through gray;
  }
</style>