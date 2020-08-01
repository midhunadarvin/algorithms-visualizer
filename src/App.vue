<template>
  <div id="app">
    <div class="page-container">
      <HomeLayout v-bind:title="title" />
    </div>
  </div>
</template>

<script>
import HomeLayout from "./layout/HomeLayout.vue";
import "basscss/css/basscss.min.css";

export default {
  name: "App",
  components: {
    HomeLayout,
  },
  data: () => ({
    title: "Sorting Algorithms Visualizer",
  }),
};
</script>

<style>
body,
#app,
.page-container {
  height: 100%;
  min-height: 100vh;
}
.pb0 {
  padding-bottom: 0 !important;
}
.h100 {
  height: 100%;
}
.w100 {
  width: 100%;
}
.w60 {
  width: 60%;
}
.flex-auto {
  flex: 1 1 auto !important;
}
@media (max-width: 600px) {
  .xs-w90 {
    min-width: 90%;
    max-width: 90%;
    flex: 0 1 90%;
  }
}

@media (max-width: 960px) {
  .sm-w90 {
    min-width: 90%;
    max-width: 90%;
    flex: 0 1 90%;
  }
}
</style>
