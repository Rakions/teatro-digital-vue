<script setup lang="ts">
import Menu from "../components/Dashboard/MenuDashboard.vue";

interface Item {
    UserID: number;
    Nombre: string;
    Apellido: string;
    Email: string;
    Telefono: string;
    Rol: number;
}

const items: Item[] = [
    {
        UserID: 123,
        Nombre: "Juan",
        Apellido: "Pérez",
        Email: "juan.perez@example.com",
        Telefono: "123-456-7890",
        Rol: 1
    },
    {
        UserID: 124,
        Nombre: "María",
        Apellido: "González",
        Email: "maria.gonzalez@example.com",
        Telefono: "234-567-8901",
        Rol: 2
    },
    {
        UserID: 125,
        Nombre: "Pedro",
        Apellido: "López",
        Email: "pedro.lopez@example.com",
        Telefono: "345-678-9012",
        Rol: 3
    }
];
</script>

<template>
    <div class="main_dashboard">
        <Menu />

        <div class="table_wrapper">
            <v-data-table :items="items" class="table"></v-data-table>
        </div>
    </div>
</template>

<style scoped>
.main_dashboard {
    display: flex;
    flex-direction: column-reverse;
    height: 100dvh;
    /* scrollbar-color: red;
    scrollbar-width: thin;
    scrollbar-gutter: stable; */
}

.table_wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1rem;

}

.table {
    border-radius: 5px;
    background: none;
    background-color: var(--color-fondo-componentes);

}

@media(min-width:768px) {
    .main_dashboard {
        flex-direction: row;
    }
}
</style>