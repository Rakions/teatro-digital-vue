<template>
  <header class="header">
    <nav class="header_nav">
      <ul class="header_ul">
        <li class="header_li">
          <div class="header_interestLinks">
            <router-link to="/">Funciones</router-link>
            <router-link to="/notFound">Ofertas</router-link>
            <router-link to="/login">Iniciar Sesión</router-link>
            <router-link to="/dashboard">Admin</router-link>
          </div>
        </li>
        <li class="header_li">
          <router-link to="/">
            <svg class="header_logo" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(150, 50)">
                <text x="0" y="-20" font-family="Lato, sans-serif" font-size="24" fill="#cda881"
                  text-anchor="middle">TEATRO
                  GALEGUISTA</text>

                <text id="theatre" x="0" y="5" font-family="Lato, sans-serif" font-size="20" fill="#cda881"
                  text-anchor="middle">Theatre</text>

                <line x1="-125" y1="2" x2="125" y2="2" stroke="#4f4a45" stroke-width="3" />
              </g>
            </svg>
          </router-link>
        </li>
        <li>
          <div class="header_information">
            <p>650 50 96 39</p>
            <div>
              <p>Corre. Baja de San Pablo, 15</p>
              <p>28004 Madrid</p>
            </div>
          </div>
        </li>
        <li class="header_li">
          <div class="header_interestLinks">
            <router-link to="/">TODAS LAS FUNCIONES</router-link>
            <router-link to="/notFound">OFERTAS</router-link>
            <router-link to="/login">Iniciar Sesion</router-link>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
text#theatre {
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
}

text {
  color: var(--color-principal);
}

line {
  transition: transform 0.5s;
}

g:hover text#theatre {
  opacity: 1;
  transform: translateY(0px);
}

g:hover line {
  transform: translateY(15px);
}
</style>
