import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
// import NotFoundView from "../views/NotFoundView.vue";
import PostView from "../views/PostView.vue";
Vue.use(VueRouter);
export default new VueRouter({
    routes: [{
            path: "/",
            redirect: {
                name: "auth",
            },
        },
        {
            path: "/auth",
            name: "auth",
            component: AuthView,
        },
        {
            path: "/home",
            name: "home",
            component: HomeView,
        },
        {
            path: "/auth",
            name: "authenticate",
            component: AuthView,
        },
        // {
        //     path: "/:pathMatch(.*)*",
        //     name: "NotFound",
        //     component: NotFoundView
        // }, 
        {
            path: "/posts",
            name: "post",
            component: PostView
        }
    ],
});