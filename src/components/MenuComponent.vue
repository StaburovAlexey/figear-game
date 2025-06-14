<script setup>
  defineEmits(['start-game', 'liderboard', 'education', 'credits', 'exit-menu'])
  defineProps({
    gameStatus: {
      type: String,
      default: 'Main-menu',
    },
  })
</script>
<template>
  <div class="menu">
    <h2
      style="margin-bottom: 0; margin-top: 30px"
      v-if="gameStatus == 'Game-over' || gameStatus == 'Finish-game'"
    >
      {{ gameStatus == 'Game-over' ? 'Вы проиграли!' : 'Вы пришли вовремя!' }}
    </h2>
    <ul class="menu__list" v-if="gameStatus == 'Main-menu'">
      <li><button @click="$emit('start-game')">Новая игра</button></li>
      <li><button @click="$emit('liderboard')">Список лидеров</button></li>
      <li><button @click="$emit('education')">Обучение</button></li>
      <li><button @click="$emit('credits')">Команда</button></li>
    </ul>
    <ul class="menu__list" v-if="gameStatus == 'Game-over' || gameStatus == 'Finish-game'">
      <li><button @click="$emit('start-game')">Начать сначала</button></li>
      <li><button @click="$emit('save-result')">Сохранить результат</button></li>
      <li><button @click="$emit('exit-menu')">Выход в меню</button></li>
    </ul>
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
    font-weight: 600;
  }
  .menu__list {
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    height: fit-content;
    list-style: none;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  .menu__list button {
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-size: 26px;
    font-weight: 600;
  }
  .menu__list li:hover button {
    cursor: pointer;
    color: rgb(154, 154, 154);
  }
</style>
