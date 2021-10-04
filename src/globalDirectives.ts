import { VueConstructor } from "vue";
import { directive as vClickOutside } from "vue-clickaway";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue: VueConstructor) {
    Vue.directive("click-outside", vClickOutside);
  },
};

export default GlobalDirectives;
