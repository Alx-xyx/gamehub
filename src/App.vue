<script>
import FooterApp from './components/FooterApp.vue';
import Footer from './components/FooterApp.vue';
import Navbar from './components/Navbar.vue';
import { login, logout, subscribeToAuthStateChanges } from './services/auth';

    export default {
        name: 'App',
        components: {FooterApp, Navbar}
    }
</script>


<template >
    <Navbar/>
    <main class="container mx-auto p-4">
        <RouterView
        />
    </main>
    <FooterApp/>
</template>


<style>
</style>