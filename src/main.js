import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
// 封装icon图标组件
import MyIcon from "@/components/MyIcon";
Vue.component("MyIcon", MyIcon);
import vant from "vant";
Vue.use(vant);
import "vant/lib/index.less";
//移动适配
import "amfe-flexible";

// 引入dayjs
import "@/utils/dayjs";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
