<template>
  <div id="app">
    <div v-show="pageShown" class="limiter">
      <Login/>
    </div>
  </div>
</template>

<script>
import Login from './components/Login'
import { authService } from './services/index.js'

export default {
  name: 'App',
  components: {
    Login
  },
  data: () => ({
    pageShown: false
  }),
  created: function () {
    if (authService.loggedIn()) {
      return authService.redirect()
    }
    
    this.pageShown = true
  }
}
</script>

<style>
.hidden {
  display: none;
}
</style>
