import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/main.scss";
import vuetify from "./plugins/vuetify.js";
import router from "./router";
import store from './store'
import Vuelidate from "vuelidate";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Notification from "vue-notification";
Vue.config.productionTip = false;
Vue.use(Loading);
Vue.use(Vuelidate);
Vue.use(Notification);
Vue.component("Loading", Loading);


new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
}).$mount("#app");