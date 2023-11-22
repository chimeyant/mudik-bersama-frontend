import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueYoutube from "vue-youtube";
import { mapActions } from "vuex";
import tinymce from "vue-tinymce-editor";
import "./assets/font.css";
Vue.component("tinymce", tinymce);
Vue.use(VueYoutube);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  mounted() {
    this.deviceResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.deviceResize, {
        passive: true,
      });
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.deviceResize, {
        passive: true,
      });
    }
  },
  data: () => ({}),
  methods: {
    ...mapActions(["deviceResize"]),
  },
  render: (h) => h(App),
}).$mount("#app");
