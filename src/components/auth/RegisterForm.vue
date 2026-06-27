<script>
export default {
    name: 'RegisterForm',

    data() {
        return {
        user: {
            email: '',
            password: ''
        }
        }
    },

    methods: {
        handleSubmit() {
        this.$emit('submit', {
            email: this.user.email,
            password: this.user.password
        })
        }
    }
    }
    </script>

    <template>
    <form @submit.prevent="handleSubmit" class="w-1/4">

        <div class="mb-3">
        <label class="block m-1 text-white">Email</label>
        <input
            type="email"
            v-model="user.email"
            class="border border-gray-300 rounded w-full"
        />
        </div>

        <div class="mb-3">
        <label class="block m-1 text-white">Contraseña</label>
        <input
            type="password"
            v-model="user.password"
            class="border border-gray-300 rounded w-full"
        />
        </div>

        <button class="bg-blue-500 text-white px-4 py-2 rounded">
        Crear cuenta
        </button>

    </form>
</template>