<template>
  <div id="app">
    <Header/>
    <div style="display: flex;flex-direction: row;flex-wrap: nowrap">
      <navigation/>
      <router-view/>
    </div>

  </div>
</template>

<script>
  import Header from "./components/Header";
  import navigation from "./components/Navigation";
export default {
  name: 'App',
  components:{Header,navigation}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
