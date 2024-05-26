import { createRouter, createWebHistory } from 'vue-router';
import PortfolioView from '../views/PortfolioView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import List from '../views/ListView.vue';
import CreatePortfolio from '../views/CreatePortfolio.vue';
import Notifications from '../views/Notifications.vue';
import Messages from '../views/Messages.vue';


const routes = [
  { path: '/', component: List, name: 'List' },
  { path: '/register', component: RegisterView, name: 'Register' },
  { path: '/login', component: LoginView, name: 'Login' },
  { path: '/portfolio', component: PortfolioView, name: 'Porfolio' },
  { path: '/create-portfolio', component: CreatePortfolio, name: 'CreatePortfolio' },
  { path: '/notifications', component: Notifications, name: 'Notifications' },
  { path: '/messages', component: Messages, name: 'Messages' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
