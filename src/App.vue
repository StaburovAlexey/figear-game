<script setup>
  import { initPixiApp } from './pixi/app';
  import { onMounted } from 'vue';
  onMounted(() => {
    const gameContainer = document.getElementById('game-container');
    initPixiApp(gameContainer);
  });
</script>

<template>
  <div id="game-container" class="game-container"></div>
</template>

<style scoped>
  .game-container {

    max-width: 800px;
    max-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    font-size: 24px;
    color: #333;
  }
</style>
