<template>
  <div id="app">
    <div class="page-container">
        <HomeLayout v-bind:title="title" />
    </div>
  </div>
</template>

<script>
import HomeLayout from './layout/HomeLayout.vue'
import 'basscss/css/basscss.min.css'

export default {
  name: 'App',
  components: {
    HomeLayout
  },
  data: () => ({
    title: "Sorting Algorithms Visualizer"
  })
}
</script>

<style>
body, #app, .page-container {
  height: 100%;
  min-height: 100vh;
}
</style>
