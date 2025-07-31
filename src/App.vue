<script setup>
  import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
  import GameContainer from './components/game/GameContainer.vue'
  import MenuComponent from './components/MenuComponent.vue'
  import LeaderboardComponent from './components/LeaderboardComponent.vue'
  import SaveResultComponent from './components/SaveResultComponent.vue'
  import OrientationGuard from './components/OrientationGuard.vue'
  import ChangeChapter from './components/ChangeChapter.vue'
  import SoundToggle from './components/SoundToggle.vue'
  import PreloaderComponent from './components/PreloaderComponent.vue'
  onMounted(async () => {
    gameStatus.value = 'Loading-menu' // Показать экран загрузки

    const tg = window.Telegram?.WebApp
    const userId = tg.initDataUnsafe?.user?.id

    console.log('Telegram User ID:', userId)
    tg?.ready()
    tg?.expand()
    tg.BackButton.hide()

    // Подожди 1 секунду или загрузи данные (например, axios / fetch)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Переход на главное меню
    gameStatus.value = 'Main-menu'

    // Проверка ориентации
    checkOrientation()
    window.addEventListener('orientationchange', checkOrientation)
    window.addEventListener('resize', checkOrientation)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('orientationchange', checkOrientation)
    window.removeEventListener('resize', checkOrientation)
  })
  const showOverlay = ref(false)
  const gameChapter = reactive({})
  const gameStatus = ref('Main-menu')
  function checkOrientation() {
    showOverlay.value = !window.matchMedia('(orientation: landscape)').matches
  }
  function gameOver(value) {
    gameStatus.value = value
  }
  function changeGameStatus(value) {
    gameStatus.value = value
  }
  function playChapter(chapter) {
    gameStatus.value = 'Start-game'
    console.log(`Играть: ${chapter.title} [${chapter.mode}]`)
    gameChapter.value = chapter
  }
</script>

<template>
  <div class="safe-area">
    <OrientationGuard @orientation-changed="changeGameStatus" />
    <LeaderboardComponent
      @exit-menu="gameStatus = 'Main-menu'"
      v-if="gameStatus == 'Leaderboard'"
    />
    <SaveResultComponent v-if="gameStatus == 'Save-result'" @exit-menu="gameStatus = 'Main-menu'" />
    <MenuComponent
      @start-game="gameStatus = 'Start-game'"
      @change-chapter="gameStatus = 'Change-chapter'"
      @exit-menu="gameStatus = 'Main-menu'"
      @liderboard="gameStatus = 'Leaderboard'"
      @save-result="gameStatus = 'Save-result'"
      v-if="
        gameStatus == 'Main-menu' ||
        gameStatus == 'Game-over' ||
        gameStatus == 'Finish-game' ||
        gameStatus == 'Loading-menu'
      "
      :game-status="gameStatus"
    />
    <ChangeChapter
      v-if="gameStatus == 'Change-chapter'"
      @back-click="gameStatus = 'Main-menu'"
      @play-chapter="playChapter"
    />
    <GameContainer
      v-if="gameStatus == 'Start-game'"
      @game-over="gameOver"
      :gameStatus
      :game-chapter="gameChapter"
    />
    <SoundToggle :gameStatus />
    <PreloaderComponent v-if="gameStatus == 'Loading-menu'" text="Загрузка..." />
  </div>
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
  .safe-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: transparent;
    padding-top: var(--tg-safe-area-inset-top);
    /* padding-top: var(--tg-content-safe-area-inset-top); */
    box-sizing: border-box;
    /* padding-bottom: var(--tg-safe-area-inset-bottom);
    padding-left: var(--tg-safe-area-inset-left);
    padding-right: var(--tg-safe-area-inset-right); */
  }
</style>
