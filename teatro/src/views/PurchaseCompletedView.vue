<script setup lang="ts">
import TheHeader from '../components/layout/PageHeader.vue'
import TheFooter from '../components/layout/PageFooter.vue'
</script>

<template>
  <main>
    <TheHeader />
    <main>
      <section class="purchase_completed">
        <h2>GRACIAS POR TU COMPRA</h2>
        <div class="purchase_completed_below">
          <span>Toda la información de la compra ha sido enviada al correo electrónico:</span>
          <span class="user_email">correoususario@gmail.com</span>
          <a href="/">Volver</a>
        </div>
      </section>
    </main>
    <TheFooter />
  </main>
</template>
