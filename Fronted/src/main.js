import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  FormRadioPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  FormRadioPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status == 401) {
      router.push({ name: "login" }).catch(() => {});
    }

    return Promise.reject(error);
  }
);
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  // base_url: "http://assigmeent3-2-lironshir.herokuapp.com",
  base_url: "http://localhost:3000",
  username: localStorage.username,
  profilePicture: localStorage.profilePicture
    ? JSON.parse(localStorage.profilePicture)
    : [],
  favoriteRecipes: localStorage.favoriteRecipes
    ? JSON.parse(localStorage.favoriteRecipes)
    : [],
  viewedRecipes: localStorage.viewedRecipes
    ? JSON.parse(localStorage.viewedRecipes)
    : [],
  searchRecipes: localStorage.searchRecipes ? localStorage.searchRecipes : [],
  addFavoriteRecipes(favoriteRecipes) {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
    this.favoriteRecipes = favoriteRecipes;
  },
  addViewedRecipes(viewedRecipes) {
    localStorage.setItem("viewedRecipes", JSON.stringify(viewedRecipes));
    this.viewedRecipes = viewedRecipes;
  },
  addProfilePicture(profilePicture) {
    localStorage.setItem("profilePicture", JSON.stringify(profilePicture));
    this.profilePicture = profilePicture;
  },
  addSearchRecipes(searchRecipes) {
    localStorage.setItem("searchRecipes", JSON.stringify(searchRecipes));
    this.searchRecipes = searchRecipes;
  },
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("favoriteRecipes");
    localStorage.removeItem("viewedRecipes");
    localStorage.removeItem("profilePicture");
    //localStorage.removeItem("searchRecipes");
    Vue.$cookies.remove("session");
    this.username = undefined;
  },
};
console.log(shared_data);

router.beforeEach((to, from, next) => {
  // if session expired or localStorage was deleted
  if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
    if (
      (shared_data.username === undefined && Vue.$cookies.get("session")) ||
      (shared_data.username !== undefined && !Vue.$cookies.get("session"))
    ) {
      shared_data.logout();
    }

    // if the route requires Authorization, and user is not authorized, we redirect to login page
    if (to.matched.some((location) => location.meta.requiresAuth)) {
      next({ name: "login" });
    } else next();
  } else next();
});

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
