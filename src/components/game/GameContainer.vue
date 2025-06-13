<script setup>
  import { initPixiApp } from '../../pixi/appPixi'
  import { onMounted, ref, watch } from 'vue'
  import GameHeader from './GameHeader.vue'
  import { preloadAssets } from '../../pixi/assets'
  // реактивные данные
  const score = ref(0)
  const lives = ref(3)
  const seconds = ref(300)
  const coins = ref(0)
  const gameOver = ref(false)
  const isLoading = ref(true) // прелоадер
  const emit = defineEmits(['game-over'])
  onMounted(async () => {
    const gameContainer = document.getElementById('game-container')
    await preloadAssets()

    isLoading.value = false
    initPixiApp(gameContainer, { score, lives, seconds, coins, gameOver })
  })
  watch(gameOver, (newGameOver) => {
    emit('game-over', newGameOver)
  })
</script>

<template>
  <div class="container">
    <GameHeader :score="score" :lives="lives" :seconds="seconds" :coins="coins" v-if="!isLoading" />
    <div id="game-container" class="game-container">
      <div v-if="isLoading" class="preloader">Загрузка...</div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .game-container {
    font-family: 'pixel';
    font-weight: 600;
    width: 100%;
    height: 100%;
    /* max-width: 800px;
    max-height: 600px; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-size: 24px;
    color: white;
  }
  .preloader {
    position: absolute;
    font-family: 'pixel';
    font-weight: 600;
    font-size: 28px;
    color: white;
    z-index: 10;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
</style>
