<script>
import FooterApp from './components/FooterApp.vue';
import Footer from './components/FooterApp.vue';
import { login, logout, subscribeToAuthStateChanges } from './services/auth';

    export default {
        name: 'App',
        components: {FooterApp},
        data() {
            return {
                user: {
                    id: null,
                    email: null,
                }
            }
        },
        methods: {
            async handleLogout() {
                try {
                    await logout();
                    this.$router.push('/ingresar');
                    console.log('El usuario activo ha cerrado la sesion');
                } catch (error) {
                    console.error('Error al cerrar la sesion', error);
                    throw new Error('Error al cerrar la sesion');
                }
            },
            async confirmLogout(){
                const result = await this.$swal({
                    title: '¿Estás seguro de que quieres cerrar sesión?',
                    text: "¡Esta acción no se puede deshacer!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, cerrar sesión',
                    cancelButtonText: 'Cancelar'
                });
                if (result.isConfirmed) {
                    await this.handleLogout();
                    await this.$swal(
                        '¡Sesión cerrada!',
                        'Has cerrado sesión correctamente.',
                        'success'
                    );
                } else {
                    console.log('El usuario canceló el cierre de sesión');
                }
            }
        },
        mounted(){
            subscribeToAuthStateChanges(newUserData => this.user = newUserData);
        }
    }
</script>


<template >
    <nav class="w-full py-4 px-6 md:px-10 bg-[#000010] border-b border-blue-900/30">
        <div class="max-w-7-xl mx-auto flex items-center justify-content">
            <div class="flex items-center gap-3">
                    <RouterLink to="/" class="font-silkscreen text-xl font-bold tracking-tight text-white">Gamehub</RouterLink>
                    <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <ul class="flex gap-4">
                            <li class="hover:text-blue-400 transition-colors duration-200"><RouterLink to="/">Home</RouterLink></li>
                            <template v-if="user.id !== null">
                                <li class="hover:text-blue-400 transition-colors duration-200"><RouterLink to="/feed">Feed</RouterLink></li>
                                <li class="hover:text-blue-400 transition-colors duration-200"><RouterLink to="/perfil">Mi perfil</RouterLink></li>
                                <li class="hover:text-blue-400 transition-colors duration-200"><form action="#"
                                    @submit.prevent="handleLogout">
                                    <button @click="confirmLogout" type="button">{{ user.email }} (Cerrar sesión)</button>
                                    </form>
                                </li>
                            </template>
                            <template v-else>
                                <li class="hover:text-blue-400 transition-colors duration-200"><RouterLink to="/ingresar">Ingresar</RouterLink></li>
                                <li class="hover:text-blue-400 transition-colors duration-200"><RouterLink to="/crear-cuenta">Crear cuenta</RouterLink></li>
                            </template>
                        </ul>
                    </div>
            </div>
        </div>
    </nav>
    <main class="container mx-auto p-4">
        <RouterView
        />
    </main>
    <FooterApp/>
</template>


<style>
</style>