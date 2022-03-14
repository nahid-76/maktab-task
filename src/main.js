import Vue from "vue";
import App from "./App.vue";
import Multiselect from "vue-multiselect";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

extend("required", {
  ...required,
  message: "This field is required",
});
extend("email", {
  ...email,
  message: "This field most be in correct email format",
});
extend("engalpha", {
  getMessage: " value is not in enghlish alphabetic",
  validate: (value) => !/[^a-zA-Z]/.test(value),
});

Vue.component("multiselect", Multiselect);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
