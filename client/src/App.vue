<template>
  <div id="app">
    <Home />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Home from "./views/Home.vue";

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #e3e3e36e;
  margin: 0;
  padding: 0;
  height: 100vh;
}
</style>
