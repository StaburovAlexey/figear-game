<script setup>
  import { initPixiApp } from '../../pixi/appPixi'
  import { onMounted, ref, watch } from 'vue'
  import GameHeader from './GameHeader.vue'

  import GameControls from './GameControls.vue'
  import PreloaderComponent from '../PreloaderComponent.vue'
  // реактивные данные
  const score = ref(0)
  const lives = ref(3)
  const seconds = ref(180)
  const bonus = ref(0)
  const gameOver = ref(false)
  const isLoading = ref(true) // прелоадер
  const emit = defineEmits(['game-over'])
  const props = defineProps({
    gameChapter: {
      type: Object,
      default: () => {},
    },
  })
  let pixiApp = null

  function moveHero(direction) {
    console.log('direction', direction)
    if (pixiApp) {
      pixiApp.moveHeroTapWindow(direction)
    }
  }
  onMounted(async () => {
    console.log('gameChapter:', props.gameChapter)

    isLoading.value = false
    const gameContainer = document.getElementById('game-container')
    pixiApp = await initPixiApp(
      gameContainer,
      { score, lives, seconds, bonus, gameOver },
      props.gameChapter.value
    )
  })
  watch(gameOver, (newGameOver) => {
    emit('game-over', newGameOver, score.value)
  })
  // watch(isLoading, async (isLoading) => {
  //   const gameContainer = document.getElementById('game-container')
  //   pixiApp = await initPixiApp(
  //     gameContainer,
  //     { score, lives, seconds, bonus, gameOver },
  //     props.gameChapter.value
  //   )
  // })
</script>

<template>
  <div class="container">
    <GameHeader
      :score="score"
      :lives="lives"
      :seconds="seconds"
      :bonus="bonus"
      :mode="props.gameChapter.value.mode"
      v-if="!isLoading"
    />
    <div id="game-container" class="game-container">
      <PreloaderComponent v-if="isLoading" text="Инициализация уровня..." />
    </div>
    <GameControls v-if="!isLoading" @move="moveHero" />
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
