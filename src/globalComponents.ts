import { VueConstructor } from "vue";
import DropDown from "./components/Dropdown.vue";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue: VueConstructor) {
    Vue.component("drop-down", DropDown);
  },
};

export default GlobalComponents;
