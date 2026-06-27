<script>
import BaseH1 from '../components/BaseH1.vue';
import CreatePost from '../components/CreatePost.vue';
import Posteos from '../components/Posteos.vue';
import { subscribeToAuthStateChanges } from '../services/auth.js';
import { fetchPosts, createPost, subscribeToPosts } from '../services/posts.js';

let unsubscribeFromPosts = () => {};

export default {
    name: 'Feed',
    components: {BaseH1, Posteos, CreatePost},
    data() {
        return {
            posts: [],
            unsubscribeFromPosts: null,
            newPost: {
                content: '',
            },
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods:{
        async sendPost(content) {
            if (!this.user?.id) {
                console.warn('El usuario no esta cargado aún');
                return
            }
            await createPost({
                content
            })

            this.newPost.content = ''
        },
            formatDate(date) {
                if (!date) return ''
                return new Date(date).toLocaleString()
            }
        },
        async mounted() {
            console.log('Feed montado');
            
            subscribeToAuthStateChanges(userData => {
                console.log('Usuario cargado:', userData);
                this.user = userData
            })
            this.posts = await fetchPosts()
            if (typeof this.unsubscribeFromPosts === 'function') {
                this.unsubscribeFromPosts()
            }
            const unsub = subscribeToPosts((newPost) => {
                if (newPost?.id) {
                    this.posts.push(newPost);
                }
            });
            this.unsubscribeFromPosts = typeof unsub === 'function' ? unsub : () => {};
        },
        unmounted() {
            if (typeof this.unsubscribeFromPosts === 'function') {
                this.unsubscribeFromPosts();
            }
            this.unsubscribeFromPosts = null;
        }
}
</script>

<template>
    <BaseH1>Feed</BaseH1>

    <div class="flex gap-4">
        <section class="w-3/4 rounded-lg p-4 h-[80vh] overflow-y-auto scrollbar-hide mt-4 bg-white/5">
            <h2 class="sr-only">Lista de posts</h2>
            <div
                v-for="post in posts"
                :key="post.id"
                class="mt-2 bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-5 hover:border-blue-800/40 transition-all duration-300 group reveal-el duration-700"
            >
                <Posteos :post="post" />
            </div>
        </section>
        <section class="w-1/4 mt-4">
            <CreatePost 
                :user="user"
                @send-post="sendPost"
            />
        </section>
    </div>
</template>

<style>
</style>