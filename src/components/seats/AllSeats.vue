<template>
    <div class="seats_all_seats">
        <div class="seats_all_seats_image"></div>

        <div class="seats_all_seats_info">
            <div style="background-color: var(--color-principal)"></div>
            <p>Libre</p>
            <div style="background-color: #ff9090"></div>
            <p>Ocupado</p>
            <div style="background-color: #62ae00"></div>
            <p>Seleccionado</p>
        </div>
    </div>
</template>

<style scoped>
.seats .seats_all_seats_image {
    width: 336px;
    height: 305px;
    background-color: var(--color-fondo-componentes);
    padding: 1rem;
    border-radius: 15px;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 3px;
}

.seats .seats_all_seats_image .seat {
    width: 100%;
    height: 100%;
    background-color: var(--color-principal);
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.seats .seats_all_seats_image .seat:hover {
    background-color: #62ae00;
}

.seats .seats_all_seats_info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    margin-top: 5px;
}

.seats .seats_all_seats_info div {
    width: 30px;
    height: 30px;
    border-radius: 5px;
}

@media (min-width: 768px) {
    .seats_all_seats {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        max-width: 740px;
        height: 100%;
    }

    .seats_all_seats .seats_all_seats_image {
        max-width: 740px;
        width: 100%;
        height: 500px;
    }
}
</style>