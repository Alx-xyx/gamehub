<script>
    export default{
        name:'BaseButton',
        props:{
            variant:{
                tyoe: String,
                required: false,
                default: 'blue'
            },
        },
    }
</script>

<template>
    <button
        type="submit"
        class="px-4 py-2 rounded text-white"
        :class="{
            'bg-blue-500 hover:bg-blue-600': variant === 'blue',
            'bg-green-500 hover:bg-green-600': variant === 'green',
            'bg-red-500 hover:bg-red-600': variant === 'red'
        }"
    >
        <slot>Enviar</slot>
    </button>
</template>