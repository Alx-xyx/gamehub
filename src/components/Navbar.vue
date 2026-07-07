<script>
import { subscribeToAuthStateChanges, logout, login } from '../services/auth.js';

export default {
    name: 'Navbar',
    data() {
        return {
            menuOpen: false,
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
        async confirmLogout() {
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
                await logout();
                this.$router.push('/ingresar');
                await this.$swal('¡Sesión cerrada!', 'Has cerrado sesión correctamente.', 'success');
            }
        }
    },
    mounted() {
        subscribeToAuthStateChanges(userData => {
            this.user = { ...userData };
        });
    },
}
</script>

<template>
    <nav class="relative w-full py-4 px-6 md:px-10 bg-[#000010] border-b border-blue-900/30">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <RouterLink to="/" class="font-silkscreen text-xl font-bold tracking-tight text-white">
                Gamehub
            </RouterLink>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <ul class="flex gap-4">
                    <li class="hover:text-blue-400 transition-colors duration-200">
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <template v-if="user.id !== null">
                        <li class="hover:text-blue-400 transition-colors duration-200">
                            <RouterLink to="/feed">Feed</RouterLink>
                        </li>
                        <li class="hover:text-blue-400 transition-colors duration-200">
                            <RouterLink to="/perfil">Mi perfil</RouterLink>
                        </li>
                        <li class="hover:text-blue-400 transition-colors duration-200">
                            <button @click="confirmLogout" type="button">{{ user.email }} (Cerrar sesión)</button>
                        </li>
                    </template>
                    <template v-else>
                        <li class="hover:text-blue-400 transition-colors duration-200">
                            <RouterLink to="/ingresar">Ingresar</RouterLink>
                        </li>
                        <li class="hover:text-blue-400 transition-colors duration-200">
                            <RouterLink to="/crear-cuenta">Crear cuenta</RouterLink>
                        </li>
                    </template>
                </ul>
            </div>
            <button @click="menuOpen = !menuOpen" class="md:hidden text-zinc-400 hover:text-white transition-colors">
                <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div v-if="menuOpen"
            class="md:hidden mt-3 pb-3 border-t border-blue-900/30 bg-[#000010] absolute w-full left-0 px-6 shadow-lg shadow-black/50 z-50">
            <ul class="flex flex-col gap-3 pt-3 text-sm font-medium text-zinc-400">
                <li class="hover:text-blue-400 transition-colors duration-200">
                    <RouterLink to="/" @click="menuOpen = false">Home</RouterLink>
                </li>
                <template v-if="user.id !== null">
                    <li class="hover:text-blue-400 transition-colors duration-200">
                        <RouterLink to="/feed" @click="menuOpen = false">Feed</RouterLink>
                    </li>
                    <li class="hover:text-blue-400 transition-colors duration-200">
                        <RouterLink to="/perfil" @click="menuOpen = false">Mi perfil</RouterLink>
                    </li>
                    <li class="hover:text-blue-400 transition-colors duration-200">
                        <button @click="confirmLogout; menuOpen = false" type="button">
                            {{ user.email }} (Cerrar sesión)
                        </button>
                    </li>
                </template>
                <template v-else>
                    <li class="hover:text-blue-400 transition-colors duration-200">
                        <RouterLink to="/ingresar" @click="menuOpen = false">Ingresar</RouterLink>
                    </li>
                    <li class="hover:text-blue-400 transition-colors duration-200">
                        <RouterLink to="/crear-cuenta" @click="menuOpen = false">Crear cuenta</RouterLink>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>