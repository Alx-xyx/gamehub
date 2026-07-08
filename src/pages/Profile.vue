<script>
import BaseH1 from '../components/BaseH1.vue';
import ProfileData from '../components/ProfileData.vue';
import { subscribeToAuthStateChanges } from '../services/auth';
import { fetchUserProfileById } from '../services/user-profiles.js';

export default {
    name: 'MyProfile',
    components: { BaseH1, ProfileData },
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                nickname: null,
                game_tag: null
            },
        }
    },
    mounted() {
        subscribeToAuthStateChanges(async userData => {
            this.user = { ...userData };
            if (!userData.id) return;
        });
    }
}
</script>

<template>
    <BaseH1>Mi perfil</BaseH1>
    <div class="flex gap-8 mt-6">
        <div class="flex flex-col items-center gap-4 w-48">
            <div class="relative">
                <img v-if="user.photo_url" :src="user.photo_url" alt="Avatar del usuario"
                    class="w-32 h-32 rounded-full object-cover ring-2 ring-blue-800/50">
                <div v-else
                    class="w-32 h-32 rounded-full bg-zinc-800 ring-2 ring-blue-800/50 flex items-center justify-center">
                    <span class="text-4xl text-zinc-500">{{ user.email?.[0]?.toUpperCase() }}</span>
                </div>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <RouterLink to="/perfil/editar"
                    class="text-center text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-lg transition-colors">
                    Editar información
                </RouterLink>
                <RouterLink to="/perfil/editar-avatar"
                    class="text-center text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-lg transition-colors">
                    Editar avatar
                </RouterLink>
            </div>
        </div>
        <ProfileData :user="user" class="flex-1" />
    </div>
</template>