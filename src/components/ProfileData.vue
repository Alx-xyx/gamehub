<script>
    export default{
        props:{
            user: Object
        }
    }
</script>

<template>
    <div class="mb-2 my-4 italic text-white">{{ user.bio  || "Sin bio disponible"}}
        <dl class="mb-4">
            <dt class="mb-1 text-white font-bold">Email:</dt>
            <dd class="mb-1 text-white">{{ user.email }}</dd>
            <dt class="mb-1 text-white font-bold">Nombre de usuario:</dt>
            <dd class="mb-1 text-white ">{{ user.nickname  || "Sin especificar"}}</dd>
            <dt class="mb-1 text-white font-bold">Tag de juego:</dt>
            <dd class="mb-1 text-white ">{{ user.game_tag  || "Sin especificar"}}</dd>
        </dl>
    </div>
</template>