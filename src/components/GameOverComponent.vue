<script setup>
  import { defineProps, computed, onMounted } from 'vue'
  import ContainerButtonInBottom from './containerButtonInBottom/ContainerButtonInBottom.vue'
  import ListLeaderboard from './leaderboard/ListLeaderboard.vue'
  import { useLeaderboardStore } from '../composables/useLeaderboardStore'
  import { useUser } from '../composables/useUser'
  const emit = defineEmits()
  const props = defineProps({
    gameStatus: {
      type: String,
      default: '',
    },
    gameChapter: {
      type: Object,
      default: () => {},
    },
    isSurpassed: {
      type: Boolean,
      default: false,
    },
  })
  const buttons = [
    {
      name: 'Главное меню',
      onClick: () => {
        emit('exit-menu')
      },
    },
    {
      name: 'Начать сначала',
      onClick: () => {
        emit('start-game')
      },
    },
  ]
  const { updateLeaderboard, leaderboard, loadingLeaderboard } = useLeaderboardStore()
  const { user } = useUser()
  const leaderboardAfterAndBeforeUser = computed(() => {
    const indexUser = leaderboard.value.findIndex((item) => item.uuid == user.value.uuid)
    return [
      leaderboard.value[indexUser - 1],
      leaderboard.value[indexUser],
      leaderboard.value[indexUser + 1],
    ]
  })
</script>
<template>
  <div class="menu">
    <h2
      style="margin-bottom: 0"
      v-if="props.gameStatus == 'Game-over' || props.gameStatus == 'Finish-game'"
    >
      {{ props.gameStatus == 'Game-over' ? 'Конец игры!' : 'Вы пришли вовремя!' }}
    </h2>
    <h3 v-if="props.isSurpassed">Вы превзошли себя!!!</h3>
    <h3 v-if="!props.isSurpassed">Вы не смогли превзойти себя...</h3>
    <ListLeaderboard class="leaderboard__list" :leaderboard="leaderboardAfterAndBeforeUser" />
    <ContainerButtonInBottom :buttons />
  </div>
</template>
<style lang="css" scoped>
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: white;
    font-family: 'pixel';
    position: relative;
    z-index: 2;
  }

  /* .menu__list.animate {
    transform: scale(20);
    animation: drop 0.6s ease-out forwards;
    animation-delay: 3s;
  } */
  /* .menu__list button {
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-size: 26px;
    font-weight: 600;
  } */
  .menu__list li:hover button {
    cursor: pointer;
    color: rgb(154, 154, 154);
  }
  .leaderboard__list {
    flex: 1;
    max-width: 60%;
    padding: 0 5px 0 0;
    /* list-style: none; */
    overflow-y: auto;
    text-align: left;
    font-size: 24px;
  }
</style>
