<template>
  <div id="app">
    <nav class="d-flex justify-content-end">
      <span>
        <router-link :to="{name: 'movies'}">Movies</router-link>
      </span>
      <span>
        <router-link to="/random">Random</router-link>
      </span>
      <span>
        <router-link to="/watch-list">WatchList</router-link>
      </span>
    </nav>
    <br>
    <br>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 5px 50px
}

nav {
  /* float: right; */
  padding: 30px;
  background-color: rgb(215, 236, 246);
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

span {
 margin-left: 20px;
}
</style>
<script>

export default({
  name: "app",
})
</script>
