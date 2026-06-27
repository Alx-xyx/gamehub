<script>
import BaseH1 from '../components/BaseH1.vue';
import ProfileData from '../components/ProfileData.vue';
import { subscribeToAuthStateChanges } from '../services/auth';
import { fetchUserProfileById } from '../services/user-profiles.js';

    export default {
        name: 'MyProfile',
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
        mounted(){
            subscribeToAuthStateChanges(async userData => {
                this.user = userData;
                if(!userData.id) return;
            });
        }
    }
</script>

<template>
    <BaseH1 class>Mi perfil</BaseH1>
    <ProfileData :user="user"/>
</template>