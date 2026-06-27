<script>
    export default {
        name: 'Posteos',
        props: {
            post: {
            type: Object,
            required: true
            }
        },
        methods: {
            formatDate(date) {
            if (!date) return ''
            return new Date(date).toLocaleString()
            }
        }
    }
</script>

<template>
    <div class="mt-2 bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-5 hover:border-blue-800/40 transition-all duration-300">
        
        <div class="flex items-center gap-2 mb-2">
        <span class="font-semibold text-white">
            {{ post.email }}
        </span>
        </div>

        <div class="flex gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-300"></div>

        <div class="flex-1">
            <div class="mb-2 text-white font-changa">
            {{ post.content }}
            </div>
        </div>
        </div>

        <div class="text-xs mt-2 text-gray-500">
        {{ formatDate(post.created_at) }}
        </div>

    </div>
</template>

