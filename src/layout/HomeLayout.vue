<template>
  <div class="wrapper">
    <md-toolbar class="md-primary">
      <span class="md-title">{{ title }}</span>
      <div class="md-toolbar-section-end">
        <!-- use router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
        <md-button class="md-primary" v-on:click="$router.push('sorting-algorithms')">
          Sorting Algorithms
        </md-button>
        <md-button class="md-primary" v-on:click="$router.push('dijkstra-algorithm')">
          Path Algorithms
        </md-button>
      </div>
    </md-toolbar>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.md-content.md-theme-default {
  background-color: #fafafa;
}

.md-layout-item {
  height: 40px;
  margin-top: 8px;
  margin-bottom: 8px;

  &:after {
    width: 100%;
    height: 100%;
    display: block;
    content: " ";
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.graph-wrapper {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
</style>