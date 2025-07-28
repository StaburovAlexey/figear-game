<script setup>
  import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
  import GameContainer from './components/game/GameContainer.vue'
  import MenuComponent from './components/MenuComponent.vue'
  import LeaderboardComponent from './components/LeaderboardComponent.vue'
  import SaveResultComponent from './components/SaveResultComponent.vue'
  import OrientationGuard from './components/OrientationGuard.vue'
  import ChangeChapter from './components/ChangeChapter.vue'
  import SoundToggle from './components/SoundToggle.vue'
  onMounted(async () => {
    checkOrientation()
    window.addEventListener('orientationchange', checkOrientation)
    window.addEventListener('resize', checkOrientation) // на случай поворота без события orientationchange
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
  <OrientationGuard @orientation-changed="changeGameStatus" />
  <LeaderboardComponent @exit-menu="gameStatus = 'Main-menu'" v-if="gameStatus == 'Leaderboard'" />
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
