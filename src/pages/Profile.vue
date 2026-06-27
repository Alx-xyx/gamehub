<script>
import BaseH1 from '../components/BaseH1.vue';
import ProfileData from '../components/ProfileData.vue';
import { subscribeToAuthStateChanges } from '../services/auth';

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
            subscribeToAuthStateChanges(userData => this.user = userData);
        }
    }
</script>

<template>
    <BaseH1 class>Mi perfil</BaseH1>
    <ProfileData :user="user"/>
</template>