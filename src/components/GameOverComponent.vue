<script setup>
  import { defineProps } from 'vue'
  import ContainerButtonInBottom from './containerButtonInBottom/ContainerButtonInBottom.vue'
  import ListLeaderboard from './leaderboard/ListLeaderboard.vue'
  const emit = defineEmits()
  const props = defineProps({
    gameStatus: {
      type: String,
      default: '',
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
</script>
<template>
  <div class="menu">
    <h2
      style="margin-bottom: 0"
      v-if="props.gameStatus == 'Game-over' || props.gameStatus == 'Finish-game'"
    >
      {{ props.gameStatus == 'Game-over' ? 'Конец игры!' : 'Вы пришли вовремя!' }}
    </h2>
    <ListLeaderboard class="leaderboard__list" />
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
    font-size: 14px;
  }
</style>
