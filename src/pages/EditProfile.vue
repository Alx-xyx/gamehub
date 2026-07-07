<script>
import BaseH1 from '../components/BaseH1.vue';
import { refreshUserProfile, subscribeToAuthStateChanges, updateCurrentUserProfile } from '../services/auth.js';
import { updateUserProfile } from '../services/user-profiles.js';

    export default {
        name: 'EditProfile',
        components: {BaseH1},
        data() {
            return {
                user: {
                    bio: null,
                    nickname: null,
                    game_tag: null
                }
            }
        },
        methods:{
            async handlesubmit(){
                try {
                    this.loading = true;
                    await updateCurrentUserProfile({
                        bio: this.user.bio,
                        nickname: this.user.nickname,
                        game_tag: this.user.game_tag
                    });
                    await refreshUserProfile();
                    await this.$swal(
                        '¡Perfil actualizado!',
                        'Tu perfil ha sido actualizado correctamente.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error al actualizar el perfil:', error);
                    await this.$swal(
                        'Error',
                        'Hubo un problema al actualizar tu perfil. Por favor, inténtalo de nuevo.',
                        'error'
                    );
                }
                this.loading = false;
            }
        },
        mounted(){
            subscribeToAuthStateChanges(userData => {
                this.user = {
                    bio: userData.bio,
                    nickname: userData.nickname,
                    game_tag: userData.game_tag
                }
            });
        }
    }
</script>

<template>
    <BaseH1>
        Actualizar perfil
    </BaseH1>
    <form 
        action="#",
        @submit.prevent="handlesubmit"
    >
        <div class="mb-3">
            <label for="bio" class="block m-1 text-white">Biografia</label>
            <textarea 
                type="text" 
                id="bio" 
                class="border border-gray-300 rounded" 
                v-model="user.bio"
            ></textarea>
        </div>
            <div class="mb-3">
            <label for="nickname" class="block m-1 text-white">nickname</label>
            <input 
                type="text" 
                id="nickname" 
                class="border border-gray-300 rounded" 
                v-model="user.nickname"
            >
        </div>
            <div class="mb-3">
            <label for="game_tag" class="block m-1 text-white">Game tag</label>
            <input 
                type="text" 
                id="game_tag" 
                class="border border-gray-300 rounded" 
                v-model="user.game_tag"
            >
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Actualizar</button>
        <RouterLink to="/perfil" class="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded transition-colors">
            Volver
        </RouterLink>
    </form>
</template>