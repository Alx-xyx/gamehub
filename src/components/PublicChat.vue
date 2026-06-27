<script>
import { subscribeToAuthStateChanges } from '../services/auth.js';
import {
    fetchPublicChatMessages,
    sendPublicChatMessage,
    subscribeToPublicChatMessages,
} from '../services/public-chat.js';

export default {
    name: 'PublicChat',

    data() {
        return {
            messages: [],
            newMessage: '',
            user: { id: null, email: null },
            unsubscribeFromChat: null,
        };
    },

    async mounted() {
        subscribeToAuthStateChanges((userData) => {
            this.user = userData;
        });

        this.messages = await fetchPublicChatMessages();
        this.$nextTick(() => this.scrollToBottom());

        this.unsubscribeFromChat = subscribeToPublicChatMessages((message) => {
            this.messages.push(message);
            this.$nextTick(() => this.scrollToBottom());
        });
    },

    unmounted() {
        if (typeof this.unsubscribeFromChat === 'function') {
            this.unsubscribeFromChat();
        }
    },

    methods: {
        async handleSend() {
            const body = this.newMessage.trim();
            if (!body || !this.user?.id) return;

            this.newMessage = '';

            await sendPublicChatMessage({
                user_id: this.user.id,
                email: this.user.email,
                body,
            });
        },

        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },

        formatTime(date) {
            if (!date) return '';
            return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },

        isOwnMessage(message) {
            return message.user_id === this.user?.id;
        },
    },
};
</script>

<template>
    <div class="flex flex-col h-[80vh] bg-white/5 rounded-lg border border-zinc-800/50">
        <div class="px-4 py-3 border-b border-zinc-800/50">
            <h2 class="text-sm font-semibold text-zinc-300 tracking-wide uppercase">Chat público</h2>
        </div>
        <div ref="messagesContainer" class="flex-1 overflow-y-auto px-3 py-3 space-y-2 scrollbar-hide">
            <div v-for="message in messages" :key="message.id" class="flex flex-col"
                :class="isOwnMessage(message) ? 'items-end' : 'items-start'">
                <span class="text-xs text-zinc-500 mb-1 px-1">
                    {{ isOwnMessage(message) ? 'Vos' : (message.email ?? 'Anónimo') }}
                </span>
                <div class="max-w-[85%] px-3 py-2 rounded-xl text-sm" :class="isOwnMessage(message)
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-zinc-800 text-zinc-100 rounded-bl-none'">
                    {{ message.body }}
                </div>
                <span class="text-xs text-zinc-600 mt-1 px-1">
                    {{ formatTime(message.created_at) }}
                </span>
            </div>
            <p v-if="messages.length === 0" class="text-center text-zinc-600 text-sm mt-8">
                Nadie habló todavía. ¡Rompé el hielo!
            </p>
        </div>
        <div class="px-3 py-3 border-t border-zinc-800/50">
            <div class="flex gap-2">
                <input v-model="newMessage" type="text" placeholder="Escribí un mensaje..."
                    class="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-600 transition-colors"
                    @keydown.enter="handleSend" />
                <button @click="handleSend" :disabled="!newMessage.trim() || !user?.id"
                    class="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>