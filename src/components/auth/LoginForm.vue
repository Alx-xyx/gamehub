<script>
    import { login } from '../../services/auth.js';
    export default{
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
        async handleSubmit(){
            try {
                this.loading = true;
                const user = await login({
                    email: this.user.email,
                    password: this.user.password
                });
                console.log('User iniciado sesión correctamente:', user);
                this.$emit('login', user);
                this.loading = false;
                this.$router.push('/feed');
            } catch (error) {
                console.error('Error en el inicio de sesión del usuario:', error);
                this.loading = false;
            }
        }
    }
    }
</script>

<template>
    <section class="w-1/4">
        <form action="#" @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="email" class="block m-1 text-white">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    class="border border-gray-300 rounded"
                    v-model="user.email"
                >
                </div>
                <div class="mb-3">
                    <label for="password" class="block m-1 text-white">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        class="border border-gray-300 rounded"
                        v-model="user.password"
                    >
                </div>
                <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Ingresar</button>
            </form>
    </section>
</template>
