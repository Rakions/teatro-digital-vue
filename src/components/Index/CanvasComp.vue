<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
        if (!ctx) {
            console.error('Failed to get the canvas context');
            return;
        }

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
    const context = ctx!;

    if (canvasRef.value) {
        const canvas = canvasRef.value;
        context.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            context.fillStyle = 'white';
            context.beginPath();
            context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            context.fill();

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
    <canvas class="canvasRef" ref="canvasRef" width="800" height="600"></canvas>
</template>

<style scoped>
.canvasRef {
    background-image: url("../../assets/images/mainPage_mainImage.jpg");
    background-size: cover;
}
</style>