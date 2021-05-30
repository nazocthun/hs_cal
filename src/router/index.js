import Vue from 'vue'
import VueRouter from 'vue-router'
import Calculator from '../views/Calculator.vue'
import Data from '../views/Data.vue'
import Pass from '../views/Pass.vue'
import Sponsor from '../views/Sponsor.vue'
import Readme from '../views/Readme.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  },
  {
    path: '/pass',
    name: 'Pass',
    component: Pass
  },
  {
    path: '/readme',
    name: 'Readme',
    component: Readme
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    component: Sponsor
  },
]

const router = new VueRouter({
  routes
})

export default router
