<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/sorting-algorithms">
        <md-icon>library_books</md-icon>
        <p>Sorting Algorithms</p>
      </sidebar-link>
      <sidebar-link to="/pathfinding-algorithms">
        <md-icon>library_books</md-icon>
        <p>Path Finding Algorithms</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "@/pages/Layout/TopNavbar.vue";
import ContentFooter from "@/pages/Layout/ContentFooter.vue";
import DashboardContent from "@/pages/Layout/Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
    };
  },
};
</script>

<style lang="scss" scoped>
.main-panel {
  background-color: #d2d2d2;
}
</style>