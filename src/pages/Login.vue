<script>
import LoginForm from '../components/auth/LoginForm.vue';
import BaseH1 from '../components/BaseH1.vue';
import { login } from '../services/auth.js';

export default {
    name: 'Login',
    components: {
        BaseH1,
        LoginForm
    },
}
</script>

<template>

    <BaseH1>Ingresar</BaseH1>
    
    <LoginForm
    />

</template>

<style>
</style>