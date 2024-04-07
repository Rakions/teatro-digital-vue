<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import InputText from 'primevue/inputtext';
import type { RegisterParams } from '@/utils/interfaces'
const userStore = useUserStore();

var errors = ref<string | null>(null);
const nombre = ref('');
const apellido = ref('');
const email = ref('');
const contrasena = ref('');
const contrasena2 = ref('');

async function handleSubmit() {
    if (!nombre.value || !apellido.value || !email.value || !contrasena.value || !contrasena2.value) {
        errors.value = "Todos los campos son obligatorios.";
        return;
    }

    if (contrasena.value.length < 12) {
        errors.value = "La contraseña tiene que tener un mínimo de 12 caracteres.";
        return;
    }

    if (contrasena.value !== contrasena2.value) {
        errors.value = "Las contraseñas no coinciden.";
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
            console.log('Token almacenado con éxito.');
        } else {
            console.log('No se encontró token en la respuesta.');
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="register_form">
        <h2>Registro</h2>
        <div class="form_inline">
            <InputText label="Nombre *" v-model="nombre" name="name" placeholder="Tu nombre aquí..." />
            <InputText label="Apellido *" v-model="apellido" name="surname" placeholder="Tu apellido aquí..." />
        </div>
        <InputText label="Email *" type="email" v-model="email" name="email" placeholder="Tu correo aquí..." required />
        <InputText label="Contraseña *" type="password" v-model="contrasena" name="password"
            placeholder="Tu contraseña aquí..." />
        <InputText label="Confirmar Contraseña *" type="password" v-model="contrasena2" name="password2"
            placeholder="Confirmar contraseña..." />
        <small class="error_message" v-if="errors">{{ errors }}</small>
        <small>¿Ya tienes una cuenta? <a href="/login" class="login">Inicia sesión</a></small>
        <button class="form_submit" type="submit">Registrar</button>
    </form>
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