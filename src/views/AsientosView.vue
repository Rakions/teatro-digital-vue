<template>
  <div class="seats">
    <a href="mainPage.html" class="seats_goBack"><i class="fa-solid fa-arrow-left"></i> Volver</a>

    <div class="seats_info">
      <div class="seats_functionInfo"></div>
    </div>

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
    <div class="selected_seats">
      <h2>ASIENTOS SELECCIONADOS</h2>
      <ul class="selected_seats_list"></ul>
      <div class="selected_seats_total">
        <h2>TOTAL:</h2>
        <button><a href="purchasePage.html">PAGAR</a></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Asiento {
  numero: number;
  precio: number;
  ocupado: boolean;
}

export default defineComponent({
  name: 'AsientosComponent',
  data() {
    return {
      id: '',
      totalPrecioAsientos: 0,
      asientosSeleccionados: [] as number[],
    };
  },
  methods: {
    async getObraById(): Promise<any> {
      this.id = localStorage.getItem("id") || "";
      const requestOptions: RequestInit = {
        method: "GET",
        mode: "no-cors",
        redirect: "follow",
      };

      const url: string = `http://localhost:3000/obras/${this.id}`;
      const response: Response = await fetch(url, requestOptions);
      const result = await response.json();
      return result;
    },

    async getAsientoPorId(ID_asiento: number): Promise<Asiento> {
      this.id = localStorage.getItem("id") || "";
      const bodyData = {
        id_obra: this.id,
        id_asiento: ID_asiento,
      };
      const requestOptions: RequestInit = {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
        redirect: "follow",
      };

      const url: string = `http://localhost:3000/asientos`;
      const response: Response = await fetch(url, requestOptions);
      const result = await response.json();
      return result;
    },

    async cargarAsientos(): Promise<void> {
      // El código de cargarAsientos va aquí.
      const obra = await this.getObraById();
      const asientos: Asiento[] = obra[0].asientos;

      const functionInfo: HTMLElement = document.querySelector(".seats_functionInfo")!;
      functionInfo.innerHTML = "";
      functionInfo.innerHTML += `
      <div class="function">
        <img src="${obra[0].image}" alt="" />
        <div>
          <h2>${obra[0].nombre}</h2>
          <p>${obra[0].descripcion}</p>
        </div>
        <input type="hidden" id="id_obra" value="${obra[0].id}"/>
      </div>`;

      const asientosHTML: HTMLElement = document.querySelector(".seats_all_seats_image")!;

      asientos.map((asiento) => {
        asientosHTML.innerHTML += `<button class="seat" id="${asiento.numero}" value='${asiento.precio}'></button>`;
      });

      const precioTotal: HTMLElement = document.querySelector(".selected_seats_total > h2")!;

      const botones: NodeListOf<HTMLButtonElement> = asientosHTML.querySelectorAll(".seat");
      botones.forEach((boton) => {
        const numeroAsiento: number = parseInt(boton.id, 10);
        const asientoCorrespondiente = asientos.find((asiento) => asiento.numero === numeroAsiento);

        if (asientoCorrespondiente && asientoCorrespondiente.ocupado) {
          boton.style.backgroundColor = "red";
          boton.disabled = true;
        } else {
          boton.addEventListener("click", () => {
            const numeroAsiento = parseInt(boton.id, 10);

            if (!this.asientosSeleccionados.includes(numeroAsiento)) {
              this.asientosSeleccionados.push(numeroAsiento);
              boton.style.backgroundColor = "#62ae00";
              this.totalPrecioAsientos += asientoCorrespondiente!.precio;
            } else {
              this.asientosSeleccionados.splice(this.asientosSeleccionados.indexOf(numeroAsiento), 1);
              boton.style.backgroundColor = "var(--color-principal)";
              this.totalPrecioAsientos -= asientoCorrespondiente!.precio;
            }
            this.actualizarLista();
            precioTotal.innerHTML = "Total: " + this.totalPrecioAsientos + "€";
          });
        }
      });
    },

    async actualizarLista(): Promise<void> {
      const listaAsientos: HTMLElement = document.querySelector(".selected_seats_list")!;
      listaAsientos.innerHTML = "";

      for (const asiento of this.asientosSeleccionados) {
        const infoAsiento = await this.getAsientoPorId(asiento);
        listaAsientos.innerHTML += `
            <li class="selected_seats_item">
              <div>Asiento: ${infoAsiento.numero}</div>
              <div>
                <p>${infoAsiento.precio + "€"}</p>
                <button onclick="this.eliminarAsiento(${infoAsiento.numero}, ${infoAsiento.precio})">X</button>
              </div>
            </li>
          `;
      }
    },

    eliminarAsiento(id_asiento: number, precio_asiento: number): void {
      const precioTotal: HTMLElement = document.querySelector(".selected_seats_total > h2")!;

      this.asientosSeleccionados = this.asientosSeleccionados.filter((asiento) => asiento !== id_asiento);

      const boton: HTMLButtonElement | null = document.getElementById(id_asiento.toString()) as HTMLButtonElement;
      if (boton) {
        boton.style.backgroundColor = "var(--color-principal)";
        this.totalPrecioAsientos -= precio_asiento;
        precioTotal.innerHTML = "Total: " + this.totalPrecioAsientos + "€";
      }

      this.actualizarLista();
    },
  },
  mounted() {
    this.cargarAsientos();
  }
});
</script>

<style scoped>
.seats {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 2rem;
}

.seats .seats_goBack {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 2rem;
  color: black;
  font-weight: 700;
}

.seats .seats_info {
  gap: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.seats .seats_info .seats_functionInfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.seats .function {
  max-width: 336px;
  min-width: 250px;
  width: 100%;
}

.seats .function img {
  width: 100%;
  height: 309px;
  object-fit: cover;
  border-radius: 15px;
}

.seats .seats_list {
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seats .seats_list ul {
  width: 100%;
  background-color: var(--color-fondo-componentes);
  padding: 1rem;
  border-radius: 15px;
}

.seats .seats_list ul li {
  display: flex;
  justify-content: space-between;
  height: 30px;
}

.seats .seats_list ul li p {
  font-size: 16px;
}

.seats .seats_list ul li input[type=checkbox] {
  border-radius: 2px;
  height: 18px;
  width: 18px;
  accent-color: var(--color-principal);
}

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

.seats .selected_seats {
  background-color: var(--color-fondo-componentes);
  padding: 1rem;
  border-radius: 15px;
}

.seats .selected_seats h2 {
  text-decoration: underline;
}

.seats .selected_seats .selected_seats_list {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  gap: 10px;
}

.seats .selected_seats .selected_seats_list li {
  width: 100%;
  justify-content: space-between;
  display: inline-flex;
}

.seats .selected_seats .selected_seats_list li div:nth-child(2) {
  display: flex;
  gap: 10px;
}

.seats .selected_seats .selected_seats_list li button {
  background: var(--color-principal);
  padding: 2px 5px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
}

.seats .selected_seats .selected_seats_total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.seats .selected_seats .selected_seats_total button {
  background-color: var(--color-principal);
  color: white;
  border: none;
  padding: 7px 15px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .function {
    width: 336px;
  }

  .seats {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  .seats .seats_goBack {
    margin-left: 5rem;
  }

  .seats_all_seats {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .seats_all_seats .seats_all_seats_image {
    max-width: 740px;
    width: 100%;
    height: 500px;
  }
}
</style>
