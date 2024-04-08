<script setup lang="ts">
const emit = defineEmits(['mostrarTabla']);
</script>

<template>
    <aside>
        <ul class="lista_enlaces">
            <li class="lista_enlaces_elemento" @click="emit('mostrarTabla', 'usuarios')">
                <router-link to="#">
                    <i class="fa-solid fa-user"></i>
                    <span>Usuarios</span>
                </router-link>
            </li>
            <li class="lista_enlaces_elemento" @click="emit('mostrarTabla', 'obras')">
                <router-link to="#">
                    <i class="fa-solid fa-masks-theater"></i>
                    <span>Obras</span>
                </router-link>
            </li>
            <li class="lista_enlaces_elemento" @click="emit('mostrarTabla', 'funciones')">
                <router-link to="#">
                    <i class="fa-solid fa-ticket"></i>
                    <span>Funciones</span>
                </router-link>
            </li>
        </ul>

        <router-link to="/" class="boton_salir">
            <button>
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Salir</span>
            </button>
        </router-link>

    </aside>
</template>

<style scoped>
aside {
    background-color: var(--color-fondo-componentes);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 0;
}

.logo {
    display: none;
}

.lista_enlaces_elemento {
    display: inline-block;
    margin: 0 1rem;
}

.lista_enlaces_elemento span,
.boton_salir span {
    display: none;
}

.lista_enlaces_elemento i,
.boton_salir i {
    font-size: 1.4rem;
    color: var(--color-secundario);
}

.boton_salir>button {
    border: none;
    background: none;
    cursor: pointer;
}

@media (min-width:768px) {
    aside {
        position: static;
        width: 200px;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
        gap: 2rem;
    }

    .logo {
        width: 100%;
        display: flex;
    }

    .lista_enlaces {
        height: 100%;
        padding: .3rem;
    }

    .lista_enlaces_elemento {
        width: 100%;
        margin: 0;
    }

    .lista_enlaces_elemento span,
    .boton_salir span {
        display: block;
    }

    .boton_salir button {
        display: flex;
        gap: .3rem;
        align-items: center;
    }

    .lista_enlaces_elemento>a {
        display: flex;
        margin: .6rem 0;
        gap: .3rem;
        transition: all .3s;
        padding: .5rem .3rem;
        border-radius: 5px;
    }

    .lista_enlaces_elemento>a:hover {
        background-color: var(--color-principal);
    }
}
</style>