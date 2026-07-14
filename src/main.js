import { createApp } from "vue";
import { router } from "./routers/index";
import App from "./App.vue";
import $ from "jquery";

//modal
import modal from "@/assets/js/modal";

const app = createApp(App);
window.$ = window.jQuery = $;
app.config.globalProperties.$ = $;

app.config.globalProperties.$modal = modal; //modal
app.use(router);
app.mount("#app");