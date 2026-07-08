<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';
import { updateCurrentUserAvatar } from '../services/auth.js';

export default {
    name: 'EditProfileAvatar',
    components: { BaseH1, BaseButton },
    props: {
        user: Object
    },
    data() {
        return {
            photo: {
                file: null,
                preview: null
            },
            uploading: false,
        }
    },
    methods: {
        async handleFileChange(event) {
            console.log('Archivo seleccionado:', event.target.files[0]);

            this.photo.file = event.target.files[0];

            if (!this.photo.file) {
                if (this.photo.preview) {
                    URL.revokeObjectURL(this.photo.preview);
                }
                this.photo.preview = null;
                return;
            }

            this.photo.preview = URL.createObjectURL(this.photo.file);

            await this.handleSubmit();
        },
        async handleSubmit() {
            try {
                this.uploading = true;
                await updateCurrentUserAvatar(this.photo.file);
            } catch (error) {
                console.error('Error al actualizar el avatar del usuario:', error); // 👈 loguea el error original
            } finally {
                this.uploading = false;
            }
        }
    },
    unmounted() {
        if (this.photo.preview) {
            URL.revokeObjectURL(this.photo.preview);
        }
    }
}   
</script>

<template>
    <BaseH1>Editar foto de perfil</BaseH1>
    <form action="#" class="mt-6 flex gap-8 items-start" @submit.prevent="handleSubmit">
        <div class="flex flex-col items-center gap-3">
            <img v-if="photo.preview" :src="photo.preview" alt="Previsualización de la imagen"
                class="w-32 h-32 object-cover rounded-full ring-2 ring-blue-800/50" />
            <div v-else
                class="w-32 h-32 rounded-full bg-zinc-800 ring-2 ring-blue-800/50 flex items-center justify-center">
                <span class="text-zinc-500 text-sm">Sin imagen</span>
            </div>
            <p class="text-xs text-zinc-500">Previsualización</p>
        </div>
        <div class="flex flex-col gap-4 flex-1">
            <div>
                <label for="file" class="block text-sm text-zinc-400 mb-2">Seleccioná una imagen</label>
                <input type="file" id="file" accept="image/*" @change="handleFileChange"
                    class="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 file:cursor-pointer file:transition-colors" />
            </div>
            <BaseButton variant="green" :disabled="!photo.file || uploading">
                {{ uploading ? 'Subiendo...' : 'Guardar foto' }}
            </BaseButton>
            <RouterLink to="/perfil" class="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                ← Volver al perfil
            </RouterLink>
        </div>
    </form>
</template>