<script setup lang="ts">

</script>

<template>
    <aside>
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="logo">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#964B00" />
        </svg>

        <ul class="lista_enlaces">
            <li class="lista_enlaces_elemento">
                <a href="#">
                    <i class="fa-solid fa-user"></i>
                    <span>Usuarios</span>
                </a>
            </li>
            <li class="lista_enlaces_elemento">
                <a href="#">
                    <i class="fa-solid fa-masks-theater"></i>
                    <span>Obras</span>
                </a>
            </li>
            <li class="lista_enlaces_elemento">
                <a href="#">
                    <i class="fa-solid fa-ticket"></i>
                    <span>Funciones</span>
                </a>
            </li>
        </ul>

        <a href="/" class="boton_salir">
            <button>
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Salir</span>
            </button>
        </a>

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