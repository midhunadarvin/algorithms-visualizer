import Vue from "vue";
import VueRouter from "vue-router";

import router from "./router";
import RangeSlider from "./components/RangeSlider.vue";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";
import "basscss/css/basscss.min.css";
import "./assets/scss/main.scss";

Vue.component("range-slider", RangeSlider);

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
  router,
}).$mount("#app");
