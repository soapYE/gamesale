import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import axios from "axios"
import {createRouter, createWebHistory} from 'vue-router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import GameList from './components/GameList.vue'
import GameDetail from './components/GameDetail.vue'
import Predict from "./components/Predict.vue"

const routes = [
    { path: '/', component: GameList },
    {path:'/game/:id', component: GameDetail},
    {path:"/predict", component: Predict}
  ]

  const router= createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })

const app = createApp(App)
app.use(ElementPlus,axios);
app.use(router);
app.mount('#app')
