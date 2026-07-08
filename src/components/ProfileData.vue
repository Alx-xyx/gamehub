<script>
export default {
    props: {
        user: Object
    }
}
</script>

<template>
    <div class="bg-white/5 border border-zinc-800/50 rounded-xl p-6">
        <p v-if="user.bio" class="italic text-zinc-400 mb-6 text-sm leading-relaxed">
            {{ user.bio }}
        </p>
        <p v-else class="italic text-zinc-600 mb-6 text-sm">Sin bio disponible</p>
        <dl class="flex flex-col gap-4">
            <div>
                <dt class="text-xs uppercase tracking-wide text-zinc-500 mb-1">Email</dt>
                <dd class="text-white">{{ user.email }}</dd>
            </div>
            <div>
                <dt class="text-xs uppercase tracking-wide text-zinc-500 mb-1">Nombre de usuario</dt>
                <dd class="text-white">{{ user.nickname || 'Sin especificar' }}</dd>
            </div>
            <div>
                <dt class="text-xs uppercase tracking-wide text-zinc-500 mb-1">Game tag</dt>
                <dd class="text-white">{{ user.game_tag || 'Sin especificar' }}</dd>
            </div>
        </dl>
    </div>
</template>