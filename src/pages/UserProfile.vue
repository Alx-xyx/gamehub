<script>
import BaseH1 from '../components/BaseH1.vue';
import ProfileData from '../components/ProfileData.vue';
import { subscribeToAuthStateChanges } from '../services/auth';
import { fetchUserProfileById } from '../services/user-profiles.js';

    export default {
        name: 'UserProfile',
        components: {BaseH1, ProfileData},
        data(){
            return{
                user: {
                    id: null,
                    email: null,
                    bio: null,
                    nickname: null,
                    game_tag: null
                },
            }
        },
        async mounted(){
            try {
                this.loading = true;
                await fetchUserProfileById(this.$route.params.id)
            } catch (error) {
                
            } finally {
                this.loading = false;
            }
    }}
</script>

<template>
    <BaseH1 class>Perfil de {{ user.email }}</BaseH1>
    <ProfileData :user="user"/>
</template>