<script>
import BaseH1 from '../components/BaseH1.vue';
import ProfileData from '../components/ProfileData.vue';
import { subscribeToAuthStateChanges } from '../services/auth';
import { fetchUserProfileById } from '../services/user-profiles.js';

export default {
    name: 'UserProfile',
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
    async mounted() {
        try {
            this.loading = true;
            const profile = await fetchUserProfileById(this.$route.params.id);
            if (profile){
                this.user = {
                    ...this.user,
                    ...profile
                }
            }
        } catch (error) {
            console.error('Error fetch user profile:', error);
        } finally {
            this.loading = false;
        }
    }
}
</script>

<template>
    <BaseH1 class>Perfil de {{ user.email }}</BaseH1>
    <ProfileData :user="user" />
    <RouterLink :to="`/usuarios/${user.id}/chat`" class="font-semibold text-blue-700">
        Iniciar Conversacion con {{user.email }}
    </RouterLink>

</template>