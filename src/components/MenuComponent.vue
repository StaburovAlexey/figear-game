<script setup>
  defineEmits(['start-game', 'list-lid', 'education', 'credits'])
</script>
<template>
  <div class="menu">
    <ul class="menu__list">
      <li><button @click="$emit('start-game')">Новая игра</button></li>
      <li><button @click="$emit('list-lid')">Список лидеров</button></li>
      <li><button @click="$emit('education')">Обучение</button></li>
      <li><button @click="$emit('credits')">Команда</button></li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: black;
  }
  .menu__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;

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
