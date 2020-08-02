import VueRouter from 'vue-router';
import App from './App.vue'
import SortingAlgorithms from './pages/sorting-algorithms/SortingAlgorithms';
import PathFindinAlgorithms from './pages/path-finding-algorithms/PathFindingAlgorithms';
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.

const routes = [
    {
        path: '/',
        component: App,
        children: [
            {
                // Default path
                path: '/',
                redirect: '/sorting-algorithms'
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/sorting-algorithms',
                component: SortingAlgorithms
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: '/pathfinding-algorithms',
                component: PathFindinAlgorithms
            }
        ]
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;