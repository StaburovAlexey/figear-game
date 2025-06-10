<script setup>
  import { onMounted, ref } from 'vue'
  import GameContainer from './components/game/GameContainer.vue'
  import MenuComponent from './components/MenuComponent.vue'
  onMounted(async () => {})

  const startGame = ref(false)
</script>

<template>
  <MenuComponent @start-game="startGame = true" v-if="!startGame" /><GameContainer v-else />
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
