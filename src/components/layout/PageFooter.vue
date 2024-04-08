<template>
  <footer class="footer">
    <div class="footer_wrapper">
      <div class="footer_column">
        <img src="../../assets/images/logo_full_dark.png" alt="" class="footer_logo" />
        <p>650 50 50 96</p>
        <p>Corre. Baja de San Pablo, 15</p>
        <p>28004 Madrid</p>
      </div>
      <div class="footer_column">
        <h2>QUIENES SOMOS</h2>
        <router-link to="/aboutUs">Quienes somos</router-link>
      </div>
      <div class="footer_column">
        <h2>PROMOCIONES</h2>
        <router-link to="/notFound">Todas las promociones</router-link>
      </div>
      <div class="footer_column">
        <h2>NUESTRAS REDES</h2>
        <div class="footer_socials">
          <router-link to="/"><i class="fa-brands fa-square-x-twitter"></i></router-link>
          <router-link to="/"><i class="fa-brands fa-square-instagram"></i></router-link>
          <router-link to="/"><i class="fa-brands fa-square-facebook"></i></router-link>
        </div>
      </div>
      <div class="footer_column">
        <p>650 50 50 96</p>
        <p>Corre. Baja de San Pablo, 15</p>
        <p>28004 Madrid</p>
      </div>
    </div>
  </footer>
</template>
