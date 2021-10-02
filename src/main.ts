import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import router from './router';
import RangeSlider from './components/RangeSlider.vue';


Vue.component('range-slider', RangeSlider);

Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router
}).$mount('#app')
