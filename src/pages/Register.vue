<script>
import RegisterForm from '../components/auth/RegisterForm.vue';
import BaseH1 from '../components/BaseH1.vue';
import { register } from '../services/auth.js';

export default {
    name: 'Register',
    components: {
        BaseH1,
        RegisterForm
    },
    data(){
        return{
            user:{
                email:'',
                password:''
            },
            loading: false,
        }
    },
    methods: {
        async handleSubmit(payload){
            try {
                this.loading = true;

                const user = await register({
                    email: payload.email,
                    password: payload.password
                });

                console.log('User registrado correctamente:', user);

                this.loading = false;
                this.$router.push('/feed');

            } catch (error) {
                console.error('Error en el registro del usuario:', error);
                this.loading = false;
            }
        }
    }
}
</script>

<template>
    <BaseH1>Crear cuenta</BaseH1>

    <RegisterForm @submit="handleSubmit"/>
</template>

<style>
</style>