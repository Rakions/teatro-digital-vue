<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import router from '@/router';
import type { Usuario } from '@/utils/interfaces';

const userStore = useUserStore();
const email = ref('');
const contrasena = ref('');
const showAlert = ref(false);
var errors = ref<string | null>(null);

async function handleSubmit() {
    showAlert.value = false;
    if (!email.value || !contrasena.value) {
        errors.value = "Todos los campos son obligatorios.";
        return;
    }

    const usuario: Usuario = {
        userID: 0,
        email: email.value,
        contra: contrasena.value,
        token: '',
        fechaInicio: '',
        ip: '',
        dispositivo: ''
    }

    try {
        const response = await userStore.loginUser(usuario);
        if (response.token) {
            localStorage.setItem('userToken', response.token);
            showAlert.value = true;
            setTimeout(() => router.replace('/'), 1000);
        } else {
            errors.value = 'No se encontró token en la respuesta.';
        }
    } catch (error) {
        errors.value = 'Error al iniciar sesión: ' + error;
    }
}
</script>

<template>
    <v-sheet class="mx-auto" width="400">
        <v-form @submit.prevent="handleSubmit" class="login_form">
            <h2>Iniciar Sesión</h2>
            <v-text-field label="Email *" type="email" v-model="email" placeholder="Tu correo aquí..."
                required></v-text-field>
            <v-text-field label="Contraseña *" type="password" v-model="contrasena" placeholder="Tu contraseña aquí..."
                required></v-text-field>
            <v-btn class="form_submit" type="submit" block>Iniciar Sesión</v-btn>
        </v-form>
        <small class="error_message" v-if="errors">{{ errors }}</small><br>
        <small>¿No tienes una cuenta? <router-link to="/register" class="register">Regístrate</router-link></small>
    </v-sheet>
    <v-alert v-if="showAlert" class="alerta" type="success" title="Inicio de sesión exitoso"
        text="Has iniciado sesión correctamente. Serás redirigido en breve."></v-alert>

</template>


<style scoped>
.login_form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    padding: 1rem;
    background-color: var(--color-fondo-componentes);
    border-radius: 10px;
    gap: 1rem;
}

.mx-auto {
    padding: 1rem;
    background: none;
}

.alerta {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    max-width: 100%;
}

.register {
    color: blue;
}

.form_submit {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: var(--color-principal);
    color: white;
    cursor: pointer;
}

.error_message {
    color: red;
}
</style>
