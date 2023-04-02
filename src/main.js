import { createApp } from "vue";
import App from "./App.vue";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

import "./assets/main.css";

createApp(App).mount("#app");
