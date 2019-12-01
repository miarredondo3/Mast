import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import auth from './app/auth';
import About from './views/About.vue';
import Help from './components/HomeInterface/Help.vue';
import Courses from './components/HomeInterface/Courses.vue';
import Messages from './components/HomeInterface/Messages.vue';
import LogoutSuccess from '@/components/LogoutSuccess';
import UserInfoStore from './app/user-info-store';
import UserInfoApi from './app/user-info-api';
import ErrorComponent from '@/components/Error';
Vue.use(Router)

function requireAuth(to, from, next) {

  if (!auth.auth.isUserSignedIn()) {
    UserInfoStore.setLoggedIn(false);
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    UserInfoApi.getUserInfo().then(response => {
      UserInfoStore.setLoggedIn(false);
      UserInfoStore.setCognitoInfo(response);
      next();
    });

  }
}

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,

      children: [
        { path: '/courses', name: 'Courses', component: Courses },
        { path: '/messages', name: 'Messages', component: Messages },
        { path: '/about', name: 'About', component: About },
        { path: '/help', name: 'Help', component: Help },
      ],
      beforeEnter: requireAuth,
    },
    {
      path: '/login', beforeEnter(to, from, next) {
        auth.auth.getSession();
        
      }
    },
    {
      path: '/login/oauth2/code/cognito', beforeEnter(to, from, next) {
        var currUrl = window.location.href;

        // console.log(currUrl);
        auth.auth.parseCognitoWebResponse(currUrl);
        // next();
      }
    },
    {
      path: '/logout', component: LogoutSuccess, beforeEnter(to, from, next) {
        auth.logout();
        next();
      }

    },
    {
      path: '/error',
      component: ErrorComponent
    },
  ],

})