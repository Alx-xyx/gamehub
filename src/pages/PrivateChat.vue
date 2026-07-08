<script>
import BaseH1 from '../components/BaseH1.vue'
import { subscribeToAuthStateChanges } from '../services/auth.js';
import { fetchPrivateChatMessages, sendPrivateChatMessage, subscribeToPrivateChatMessages } from '../services/private-chat.js';
import { fetchUserProfileById } from '../services/user-profiles.js';

export default {
    name: "PrivateChat",
    components: { BaseH1 },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            otherUser: {
                id: null,
                email: null,
                nickname: null,
            },
            loadingOtherUser: false,

            messages: [],
            loadingMessage: false,

            newMessage: {
                body: "",
            },
            sendingMessage: false,
            unsubscribeFromChat: null,
            loading: true,
        }
    },
    methods: {
        async sendMessage() {
            console.log('user.id:', this.user.id, 'otherUser.id:', this.otherUser.id);

            console.log('sendMessage llamado', this.newMessage.body, this.user?.id);
            try {
                await sendPrivateChatMessage({
                    senderId: this.user.id,
                    receiverId: this.$route.params.id,
                    body: this.newMessage.body,
                })
                this.newMessage.body = "";
                console.log('mensaje enviado');

            } catch (error) {
                console.error('Error en sendMessage:', error);

            }
        },
        isOwnMessage(message) {
            return message.sender_id === this.user?.id;
        },
        formatTime(timestamp) {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    },
    async mounted() {
        try {
            this.loadingOtherUser = true;
            this.loadingMessage = true;

            await new Promise(resolve => {
                subscribeToAuthStateChanges(userData => {
                    this.user = userData;
                    if (userData.id) resolve();
                });
            });

            subscribeToPrivateChatMessages(
                this.user.id,
                this.$route.params.id,
                newMessage => { this.messages.push(newMessage); }
            )

            const profile = await fetchUserProfileById(this.$route.params.id);
            console.log('profile:', profile);
            console.log('route param:', this.$route.params.id);
            if (profile) {
                this.otherUser = { id: this.$route.params.id, ...profile };
            }

            const messages = await fetchPrivateChatMessages(this.user.id, this.$route.params.id);
            if (messages) {
                this.messages = messages;
            }

            this.loading = false;
            this.unsubscribeFromChat = subscribeToPrivateChatMessages(
                this.user.id,
                this.$route.params.id,
                newMessage => { this.messages.push(newMessage); }
            )
        } catch (error) {
            console.error(error);
        } finally {
            this.loadingOtherUser = false;
            this.loadingMessage = false;
        }
    },
    unmounted() {
        if (typeof this.unsubscribeFromChat === 'function') {
            this.unsubscribeFromChat();
        }
    }
}
</script>

<template>
    <div class="max-w-2xl mx-auto px-4 py-6">
        <BaseH1>Chat con {{ otherUser.email }}</BaseH1>
        <div class="flex flex-col h-[75vh] bg-white/5 rounded-lg border border-zinc-800/50 mt-4">
            <div v-if="loading" class="flex-1 flex items-center justify-center text-zinc-500 text-sm">
                Cargando chat...
            </div>
            <template v-else>
                <div ref="messagesContainer" class="flex-1 overflow-y-auto px-3 py-3 space-y-2 scrollbar-hide">
                    <div v-for="message in messages" :key="message.id" class="flex flex-col"
                        :class="isOwnMessage(message) ? 'items-end' : 'items-start'">
                        <div class="max-w-[75%] px-3 py-2 rounded-xl text-sm" :class="isOwnMessage(message)
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-zinc-800 text-zinc-100 rounded-bl-none'">
                            {{ message.body }}
                        </div>
                        <span class="text-xs text-zinc-600 mt-1 px-1">
                            {{ formatTime(message.created_at) }}
                        </span>
                    </div>
                    <p v-if="messages.length === 0" class="text-center text-zinc-600 text-sm mt-8">
                        No hay mensajes todavía. ¡Escribí el primero!
                    </p>
                </div>
                <div class="px-3 py-3 border-t border-zinc-800/50">
                    <div class="flex gap-2">
                        <input v-model="newMessage.body" type="text" placeholder="Escribí un mensaje..."
                            class="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-600 transition-colors"
                            @keydown.enter="sendMessage" />
                        <button @click="sendMessage" :disabled="!newMessage.body.trim() || !user?.id"
                            class="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </template>
        </div>
        <RouterLink :to="`/usuarios/${otherUser.id}`"
            class="inline-block mt-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Volver al perfil
        </RouterLink>
    </div>
</template>