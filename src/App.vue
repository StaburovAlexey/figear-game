<script setup>
  import { ref, onMounted, onBeforeUnmount, reactive, computed } from 'vue'
  import GameContainer from './components/game/GameContainer.vue'
  import MenuComponent from './components/MenuComponent.vue'
  import LeaderboardComponent from './components/leaderboard/LeaderboardComponent.vue'
  import SaveResultComponent from './components/SaveResultComponent.vue'
  import OrientationGuard from './components/OrientationGuard.vue'
  import ChangeChapter from './components/ChangeChapter.vue'
  import SoundToggle from './components/SoundToggle.vue'
  import PreloaderComponent from './components/PreloaderComponent.vue'
  import GameOverComponent from './components/GameOverComponent.vue'
  import { preloadAssets } from './pixi/assets'
  import { useUser } from './composables/useUser'
  import { useLeaderboardStore } from './composables/useLeaderboardStore'

  const { user, getUser, updateScores, userScoreForChapterAndMode } = useUser()
  const { updateLeaderboard } = useLeaderboardStore()

  const showOverlay = ref(false)
  const gameChapter = reactive({})
  const gameStatus = ref('Main-menu')
  const isSurpassed = ref(false)
  // Компоненты по статусу
  const componentsMap = {
    'Main-menu': MenuComponent,
    'Loading-menu': MenuComponent,
    Leaderboard: LeaderboardComponent,
    'Save-result': SaveResultComponent,
    'Game-over': GameOverComponent,
    'Finish-game': GameOverComponent,
    'Change-chapter': ChangeChapter,
    'Start-game': GameContainer,
  }

  const currentComponent = computed(() => componentsMap[gameStatus.value] || null)

  onMounted(async () => {
    gameStatus.value = 'Loading-menu' // или 'Loading-menu', если нужно показать загрузку
    const tg = window.Telegram?.WebApp
    const telegram_id = tg?.initDataUnsafe?.user?.id || 807148322
    const username = tg?.initDataUnsafe?.user?.username || 'gilbertfrost'

    tg?.ready()
    tg?.expand()
    tg.BackButton?.hide()

    await preloadAssets()
    await getUser({ telegram_id, username })

    gameStatus.value = 'Main-menu'

    checkOrientation()
    window.addEventListener('orientationchange', checkOrientation)
    window.addEventListener('resize', checkOrientation)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('orientationchange', checkOrientation)
    window.removeEventListener('resize', checkOrientation)
  })

  function checkOrientation() {
    showOverlay.value = !window.matchMedia('(orientation: landscape)').matches
  }

  async function gameOver(gStatus, score) {
    isSurpassed.value = false
    const userScore = userScoreForChapterAndMode(
      gameChapter.value.chapter_id,
      gameChapter.value.mode
    )?.score
    if (!userScore || userScore < Math.floor(score)) {
      await updateScores(gameChapter.value.chapter_id, gameChapter.value.mode, Math.floor(score))

      isSurpassed.value = true
    }
    await updateLeaderboard(gameChapter.value.chapter_id, gameChapter.value.mode)
    gameStatus.value = gStatus
  }

  function changeGameStatus(value) {
    gameStatus.value = value
  }

  function playChapter(chapter) {
    gameStatus.value = 'Start-game'
    gameChapter.value = chapter
  }
</script>

<template>
  <div class="safe-area">
    <OrientationGuard @orientation-changed="changeGameStatus" />
    <component
      :is="currentComponent"
      v-if="currentComponent"
      :game-status="gameStatus"
      :game-chapter="gameChapter"
      :user-id="user?.id"
      :is-surpassed="isSurpassed"
      @exit-menu="gameStatus = 'Main-menu'"
      @start-game="gameStatus = 'Start-game'"
      @change-chapter="gameStatus = 'Change-chapter'"
      @liderboard="gameStatus = 'Leaderboard'"
      @save-result="gameStatus = 'Save-result'"
      @play-chapter="playChapter"
      @back-click="gameStatus = 'Main-menu'"
      @game-over="gameOver"
    />

    <SoundToggle :gameStatus="gameStatus" />
    <PreloaderComponent v-if="gameStatus === 'Loading-menu'" text="Загрузка..." />
  </div>
</template>

<style scoped>
  .game-container {
    width: 100%;
    height: 100%;
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
    box-sizing: border-box;
  }
</style>
