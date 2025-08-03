<script setup>
  import { onMounted, ref, watch, computed } from 'vue'
  import { useLeaderboardStore } from '../../composables/useLeaderboardStore.js'
  import { useUser } from '../../composables/useUser.js'
  import listItemLeaderboard from './ItemListLeaderboard.vue'
  import ListLeaderboard from './ListLeaderboard.vue'
  const emit = defineEmits(['exit-menu'])

  const { user } = useUser()
  const { leaderboard, loadingLeaderboard, updateLeaderboard } = useLeaderboardStore()
  const myScore = ref(null)
  const loading = ref(false)
  const chapters = ref([{ id: 1, name: 'Заезд' }])
  const modes = ref([
    { id: 1, name: 'Обычный' },
    { id: 2, name: 'Бесконечный' },
  ])

  const selectedChapter = ref(1)
  const selectedMode = ref(1)
  const computerdUserPosition = computed(() => {
    return leaderboard.value.findIndex((item) => item.user_id == user.user_id) + 1 || 'не в топе'
  })
  async function loadData() {
    loading.value = true
    console.log('user', user.value)
    if (user.value.telegram_id) {
      myScore.value =
        user.value.scores.find(
          (s) => s.chapter_id === selectedChapter.value && s.mode_id === selectedMode.value
        ) || null
    }
    await updateLeaderboard(selectedChapter.value, selectedMode.value)
    loading.value = false
  }

  onMounted(async () => {
    await loadData()
  })

  watch([selectedChapter, selectedMode], loadData)
</script>

<template>
  <div class="leaderboard">
    <h3 class="leaderboard__title">Список лидеров</h3>

    <div class="tabs">
      <button
        v-for="chapter in chapters"
        :key="chapter.id"
        :class="{ active: selectedChapter === chapter.id }"
        @click="selectedChapter = chapter.id"
      >
        {{ chapter.name }}
      </button>
    </div>

    <div class="tabs tabs--sub">
      <button
        v-for="mode in modes"
        :key="mode.id"
        :class="{ active: selectedMode === mode.id }"
        @click="selectedMode = mode.id"
      >
        {{ mode.name }}
      </button>
    </div>
    <div class="leaderboard__content" v-loading="{ show: loading, text: 'Загрузка...' }">
      <!-- <ol class="leaderboard__list">
        <listItemLeaderboard
          v-for="(item, index) in leaderboard"
          :key="item.user_id"
          :index
          :item
          :class="{ me: item.uuid === user?.uuid }"
        />
      </ol> -->
      <ListLeaderboard :leaderboard class="leaderboard__list" />
      <div class="leaderboard__info">
        <template v-if="myScore">
          <h4>Ваши показатели</h4>
          <p>Очки: {{ myScore.score }}</p>
          <p>Глава: {{ chapters.find((c) => c.id === selectedChapter)?.name }}</p>
          <p>Режим: {{ modes.find((m) => m.id === selectedMode)?.name }}</p>
          <p>
            Место:
            {{ computerdUserPosition }}
          </p>
        </template>
        <template v-else>
          <h4>Вы ещё не играли в этот режим</h4>
        </template>
      </div>
    </div>

    <button class="leaderboard__btn-exit" @click="emit('exit-menu')">Вернуться в меню</button>
  </div>
</template>

<style scoped>
  .leaderboard {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    font-family: 'pixel';
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    overflow: hidden;
  }

  .leaderboard__title {
    margin: 0 0 5px;
    font-size: 16px;
  }

  .tabs {
    display: flex;
    gap: 6px;
    height: 30px;
    margin-bottom: 6px;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    justify-content: center;
  }
  .tabs button {
    white-space: nowrap;
    background: transparent;
    border: 1px solid white;
    color: white;
    padding: 4px 8px;
    font-family: 'pixel';
    font-size: 12px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .tabs button.active {
    background: white;
    color: black;
  }
  .tabs--sub {
    margin-top: 0;
    margin-bottom: 10px;
    opacity: 0.85;
  }

  .leaderboard__content {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .leaderboard__list {
    flex: 1;
    max-width: 60%;
    padding: 0 5px 0 0;
    /* list-style: none; */
    overflow-y: auto;
    text-align: left;
    font-size: 14px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }

  .leaderboard__info {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }
  .leaderboard__info p {
    margin: 0;
  }
  .leaderboard__info h4 {
    margin: 0 0 10px;
    font-size: 16px;
  }

  .leaderboard__btn-exit {
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-size: 14px;
    font-weight: 600;
    margin-top: 5px;
  }
  .leaderboard__btn-exit:hover {
    cursor: pointer;
    color: rgb(154, 154, 154);
  }
</style>
