import App from "../App.vue";
import SortingAlgorithms from "../pages/sorting-algorithms/SortingAlgorithms.vue";
import PathFindinAlgorithms from "../pages/path-finding-algorithms/PathFindingAlgorithms.vue";

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
const routes = [
  {
    path: "/",
    component: App,
    children: [
      {
        // Default path
        path: "/",
        redirect: "/sorting-algorithms",
      },
      {
        path: "/sorting-algorithms",
        component: SortingAlgorithms,
      },
      {
        path: "/pathfinding-algorithms",
        component: PathFindinAlgorithms,
      },
    ],
  },
];

export default routes;
