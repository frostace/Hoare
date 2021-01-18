import Vue from "vue";
import App from "./App.vue";

import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faRedo } from "@fortawesome/free-solid-svg-icons/faRedo";
import { faSortNumericDown } from "@fortawesome/free-solid-svg-icons/faSortNumericDown";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlay, faRedo, faSortNumericDown);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
