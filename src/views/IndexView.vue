<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheHeader from '../components/layout/PageHeader.vue';
import TheFooter from '../components/layout/PageFooter.vue';
import CategoriasSelector from '../components/Index/CategoriaSelector.vue';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

const stars: Star[] = [];
const numStars: number = 100;

onMounted(() => {
  if (canvasRef.value) {
    const canvas = canvasRef.value;
    ctx = canvas.getContext('2d');

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
      });
    }

    drawStars();
  }
});

function drawStars(): void {

  if (ctx && canvasRef.value) {

    const canvas = canvasRef.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawStars);
  }
}
</script>

<template>
  <main>
    <TheHeader />
    <main class="mainPage">
      <div class="mainPage_mainImage">
        <canvas class="canvasRef" ref="canvasRef" width="800" height="600"></canvas>
      </div>
      <CategoriasSelector />
    </main>
    <TheFooter />
  </main>
</template>

<style scoped>
.canvasRef {
  background-image: url("../assets/images/mainPage_mainImage.jpg");
  background-size: cover;
}
</style>
