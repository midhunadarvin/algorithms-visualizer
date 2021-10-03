import Vue from "vue";
import VueRouter from "vue-router";

import router from "./router";
import RangeSlider from "./components/RangeSlider.vue";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";
import "basscss/css/basscss.min.css";
import "./assets/scss/main.scss";

Vue.component("range-slider", RangeSlider);

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.config.productionTip = false;

new Vue({
  router,
}).$mount("#app");
