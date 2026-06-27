<script>
    export default{
        name: "CreatePost",
        props:{
            user: Object
        },
        data(){
            return{
                content: ''
            }
        },
        methods:{
            handleSubmit(){
            if (!this.user?.id) {
                console.warn('El usuario no esta cargado aún');
                return
            }
                this.$emit('send-post', this.content)
                this.content=''
            }
        }
    }
</script>


<template>
    <div class="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-5 backdrop-blur">
        
        <h2 class="text-lg font-semibold text-white mb-4">
        Crear post
        </h2>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">

        <textarea
            v-model="content"
            rows="4"
            placeholder="¿Qué estás pensando?"
            class="bg-zinc-900/60 text-white placeholder-gray-400 rounded-lg p-3 resize-none outline-none border border-zinc-800 focus:border-blue-500 transition"
        ></textarea>

        <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
            :disabled="!user?.id || !content.trim()"
        >
            Publicar
        </button>

        </form>
    </div>
</template>