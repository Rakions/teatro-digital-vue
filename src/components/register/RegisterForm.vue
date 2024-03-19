<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();

interface RegisterParams {
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    contrasena: string,
    rol: 0
}

var errors = ref<string | null>(null);

function handleSubmit() {
    const nameInput = document.querySelector<HTMLInputElement>('input[name="name"]')!;
    const surnameInput = document.querySelector<HTMLInputElement>('input[name="surname"]')!;
    const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]')!;
    const passwordInput = document.querySelector<HTMLInputElement>('input[name="password"]')!;
    const password2Input = document.querySelector<HTMLInputElement>('input[name="password2"]')!;

    if (!nameInput || !surnameInput || !emailInput || !passwordInput || !password2Input) {
        alert('Algunos elementos del formulario no se pueden encontrar en el documento.');
        return;
    }

    const campos = [nameInput, surnameInput, emailInput, passwordInput, password2Input];
    const camposValidos = validarCamposNoVacios(campos);

    if (!camposValidos) {
        errors.value = "Algunos campos están vacíos, rellénalos para continuar."
        return;
    }
    if (passwordInput.value.length < 12 || password2Input.value.length < 12) {
        errors.value = "La contraseña tiene que tener un mínimo de 12 caracteres"
    }

    const params: RegisterParams = {
        nombre: nameInput.value,
        apellido: surnameInput.value,
        email: emailInput.value,
        telefono: "123",
        contrasena: passwordInput.value,
        rol: 0
    }

    userStore.registerUser(params);
}

function validarCamposNoVacios(elementos: HTMLInputElement[]): boolean {
    let todosLosCamposSonValidos = true;

    for (const elemento of elementos) {
        if (elemento.value.trim() === '') {
            todosLosCamposSonValidos = false;
            elemento.classList.add('campo-invalido');
        } else {
            elemento.classList.remove('campo-invalido');
        }
    }

    return todosLosCamposSonValidos;
}

</script>

<template>
    <form action="" class="register_form" @submit.prevent="handleSubmit">
        <h2>Registro</h2>
        <div class="form_inline">
            <label for="name" class="form_label">
                <span>Nombre *</span>
                <input type="text" name="name" class="form_input" placeholder="Tu nombre aquí...">
            </label>
            <label for="surname" class="form_label">
                <span>Apellido *</span>
                <input type="text" name="surname" class="form_input" placeholder="Tu apellido aquí...">
            </label>
        </div>
        <label for="email" class="form_label">
            <span>Email *</span>
            <input type="mail" name="email" class="form_input" placeholder="Tu correo aquí..." required>
        </label>
        <label for="password" class="form_label">
            <span>Contraseña *</span>
            <input type="password" name="password" class="form_input" placeholder="Tu contraseña aquí...">
        </label>
        <label for="password2" class="form_label">
            <span>Confirmar Contraseña *</span>
            <input type="password" name="password2" class="form_input" placeholder="Confirmar contraseña...">
        </label>
        <small class="error_message" v-if="errors">{{ errors }}</small>
        <small>¿Ya tienes una cuenta? <a href="/login" class="login"> Inicia sesión</a></small>
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