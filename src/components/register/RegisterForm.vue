<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import type { RegisterParams } from '@/utils/interfaces';
import router from '@/router';

const userStore = useUserStore();
const showAlert = ref(false); // 1
const nombre = ref('');
const apellido = ref('');
const email = ref('');
const contrasena = ref('');
const contrasena2 = ref('');

async function handleSubmit() {
    showAlert.value = false; // Resetear la alerta antes de la validación
    if (!nombre.value || !apellido.value || !email.value || !contrasena.value || !contrasena2.value) {
        showAlert.value = true; // Mostrar la alerta si hay campos faltantes
        return;
    }

    if (contrasena.value.length < 12) {
        showAlert.value = true; // Mostrar la alerta si la contraseña es demasiado corta
        return;
    }

    if (contrasena.value !== contrasena2.value) {
        showAlert.value = true; // Mostrar la alerta si las contraseñas no coinciden
        return;
    }

    const params: RegisterParams = {
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        contrasena: contrasena.value,
        rol: 0,
        telefono: "0"
    }

    try {
        const response = await userStore.registerUser(params);
        if (response.token) {
            localStorage.setItem('userToken', response.token);
            showAlert.value = true; // Mostrar la alerta de registro exitoso
            router.replace('/');
        } else {
            console.log('No se encontró token en la respuesta.');
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
}
</script>

<template>
    <v-sheet class="mx-auto" width="400">
        <v-form @submit.prevent="handleSubmit" class="register_form">
            <h2>Registro</h2>
            <div class="form_inline">
                <v-text-field label="Nombre *" v-model="nombre" name="name" placeholder="Tu nombre aquí..."
                    required></v-text-field>
                <v-text-field label="Apellido *" v-model="apellido" name="surname" placeholder="Tu apellido aquí..."
                    required></v-text-field>
            </div>
            <v-text-field label="Email *" type="email" v-model="email" name="email" placeholder="Tu correo aquí..."
                required></v-text-field>
            <v-text-field label="Contraseña *" type="password" v-model="contrasena" name="password"
                placeholder="Tu contraseña aquí..." required></v-text-field>
            <v-text-field label="Confirmar Contraseña *" type="password" v-model="contrasena2" name="password2"
                placeholder="Confirmar contraseña..." required></v-text-field>
            <v-btn class="form_submit" type="submit" block>Registrar</v-btn>
        </v-form>
        <v-alert v-if="showAlert" class="alerta" type="error" title="Error en el registro"
            text="Por favor, revisa los campos e inténtalo nuevamente."></v-alert> <!-- 3 -->
        <small>¿Ya tienes una cuenta? <a href="/login" class="login">Inicia sesión</a></small>
    </v-sheet>
</template>



<style scoped>
.register_form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    padding: 1rem;
    background-color: var(--color-fondo-componentes);
    border-radius: 10px;
    gap: 1rem;
}

.form_inline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 976px) {
    .form_inline {
        flex-direction: row;
    }
}

.form_label {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form_label>span {
    color: grey;
    margin-bottom: 3px;
}

.form_input {
    widows: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.form_submit {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: var(--color-principal);
    color: white;
    cursor: pointer;
}

.login {
    color: blue;
}

.error_message {
    color: red;
}
</style>