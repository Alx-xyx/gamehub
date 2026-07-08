<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';

export default {
    name: 'EditProfileAvatar',
    components: { BaseH1, BaseButton},
    props: {
        user: Object
    },
    data(){
        return{
            photo:{
                file: null,
                preview: null
            }
        }
    },
    methods: {
        handleFileChange(event){
            console.log('Archivo seleccionado:', event.target.files[0]);
            this.photo.file = event.target.files[0];
            this.photo.preview = URL.createObjectURL(this.photo.file);
        }
    }
}   
</script>

<template>
    <BaseH1>Editar foto de perfil</BaseH1>
    <form action="#" class="flex gap-4">
        <div class="mb-3">
            <label class="block m-1 text-white">Foto</label>
            <input type="file" id="file" @change="handleFileChange" class="border border-gray-300 rounded w-full" />
            <BaseButton variant="green">Cambiar foto</BaseButton>
        </div>
        <div>
            <p>Previsualizacion de imagen</p>
            <img v-if="photo.preview" :src="photo.preview" alt="Previsualización de la imagen" class="w-32 h-32 object-cover rounded-full" />
            <p v-else>No hay imagen seleccionada</p>
        </div>
    </form>
</template>