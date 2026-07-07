//* Imports
import { createRouter, createWebHistory } from 'vue-router'
import PublicChat from '../pages/Feed.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Home from '../pages/Home.vue'
import { subscribeToAuthStateChanges } from '../services/auth'
import Profile from '../pages/Profile.vue'
import EditProfile from '../pages/EditProfile.vue'
import UserProfile from '../pages/UserProfile.vue'
import PrivateChat from '../pages/PrivateChat.vue'

//? Creacion de rutas

const routes = [
    {path: '/', component: Home },
    {path: '/ingresar', component: Login },
    {path: '/crear-cuenta', component: Register },
    {path: '/feed', component: PublicChat, meta: { requiresAuth: true } },
    {path: '/perfil', component: Profile, meta: { requiresAuth: true } },
    {path: '/perfil/editar', component: EditProfile, meta: { requiresAuth: true } },
    {path: '/usuarios/:id', component: UserProfile, meta: { requiresAuth: true } },
    {path: '/usuarios/:id/chat', component: PrivateChat, meta: { requiresAuth: true } },

]

const router = createRouter ({
    routes,
    history: createWebHistory(),
});

//! Restriccion de rutas

let user = {
    id: null, 
    email: null,
}

subscribeToAuthStateChanges(userData => {user = userData});

router.beforeEach((to,from) => {
    
    if(to.meta.requiresAuth && user.id === null){
        return '/ingresar';
    }
    }
);

export default router;