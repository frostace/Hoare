import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPlay,
    faRedo,
    faSortNumericDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlay, faRedo, faSortNumericDown);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Antd);
Vue.config.productionTip = false;
new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
