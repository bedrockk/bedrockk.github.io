<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script>
import Index from "@/components/Index";

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
</style>
