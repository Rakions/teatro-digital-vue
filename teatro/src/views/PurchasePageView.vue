<script setup lang="ts">
import TheHeader from '../components/layout/PageHeader.vue'
import TheFooter from '../components/layout/PageFooter.vue'
</script>

<template>
  <main>
    <TheHeader />
    <main class="mainPage">

      <section class="data_formulary">
        <form onsubmit="return false;">
          <h2>Introduce tus datos</h2>
          <div class="data_formulary_inputs">
            <div>
              <input type="text" id="name" name="name" placeholder="Nombre" required />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div>
              <input type="text" id="surnames" name="surnames" placeholder="Apellidos" required />

              <input
                type="email"
                id="repeatemail"
                name="repeatemail"
                placeholder="Repetir Correo electrónico"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Número de teléfono móvil"
                required
              />
            </div>
          </div>

          <div>
            <input type="checkbox" />
            <span
              >Acepto las condiciones generales de compra y confirmo que he leído el Aviso Legal y
              la Política de privacidad.</span
            >
          </div>
          <div>
            <input type="checkbox" />
            <span>Deseo recibir ofertas y promociones de futuros espectáculos.</span>
          </div>
        </form>
      </section>

      <div class="mainPage_functionsList"></div>
    </main>
    <TheFooter />
  </main>
</template>
