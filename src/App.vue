<script setup>
  import { initPixiApp } from './pixi/appPixi'
  import { onMounted, ref } from 'vue'
  import GameHeader from './components/GameHeader.vue'
  import { preloadAssets } from './pixi/assets'
  // реактивные данные
  const score = ref(0)
  const lives = ref(3)
  const bullets = ref(10)
  const coins = ref(0)
  onMounted(async () => {
    const gameContainer = document.getElementById('game-container')
    await preloadAssets()
    initPixiApp(gameContainer, { score, lives, bullets, coins })
  })
</script>

<template>
  <GameHeader :score="score" :lives="lives" :bullets="bullets" :coins="coins" />
  <div id="game-container" class="game-container"></div>
</template>

<style scoped>
  .game-container {
    width: 100%;
    height: 100%;
    /* max-width: 800px;
    max-height: 600px; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    font-size: 24px;
    color: #333;
  }
</style>
