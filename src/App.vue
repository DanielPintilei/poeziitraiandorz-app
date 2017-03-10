<template>
  <div id="app">
    <navbar></navbar>
    <search></search>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Search from './components/Search'

export default {
  name: 'app',
  components: {
    Navbar,
    Search
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  border: 10px solid #dcbf8c;
}
</style>
