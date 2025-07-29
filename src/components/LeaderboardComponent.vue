<script setup>
  import { onMounted, ref } from 'vue'
  import { getTopScoresByChapter } from '../api/api.js'
  const emit = defineEmits(['exit-menu'])
  const leaderboard = ref([])
  onMounted(() => {
    leaderboard.value = getTopScoresByChapter(1, 1) // Пример вызова с chapter_id и mode_id
  })
</script>
<template>
  <div class="leaderboard">
    <h3 class="leaderboard__title">Список лидеров</h3>
    <ol class="leaderboard__list">
      <li><span>1.</span>fsdfsdfdf</li>
    </ol>
    <button class="leaderboard__btn-exit" @click="emit('exit-menu')">Вернуться в меню</button>
  </div>
</template>

<style lang="css" scoped>
  .leaderboard {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px;
    font-family: 'pixel';
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }
  .leaderboard__list {
    flex: 1;
    padding: 0;
    /* width: 50%; */
    text-align: end;
    overflow: auto;
    list-style: none;
  }
  .leaderboard__list span {
    margin-right: 10px;
  }
  .leaderboard__list li {
    margin-right: 10px;
  }
  .leaderboard__btn-exit {
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-size: 16px;
    font-weight: 600;
  }
  .leaderboard__btn-exit:hover {
    cursor: pointer;
    color: rgb(154, 154, 154);
  }
</style>
