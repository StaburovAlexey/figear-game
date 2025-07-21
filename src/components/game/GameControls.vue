<script setup>
  import { defineEmits } from 'vue'

  const emit = defineEmits(['move'])

  function emitMove(direction) {
    emit('move', direction)
  }
</script>
<template>
  <div class="controls">
    <div class="left-controls">
      <button class="control-button" @click="emitMove('ArrowUp')">&#9650;</button>
      <button class="control-button" @click="emitMove('ArrowDown')">&#9660;</button>
    </div>
    <div class="right-controls">
      <button class="control-button jump" @click="emitMove('Jump')">Jump</button>
    </div>
  </div>
</template>
<style scoped>
  .controls {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    pointer-events: none;
  }

  .left-controls,
  .right-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: auto;
  }

  .control-button {
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 24px;
    cursor: pointer;
  }

  .control-button:active {
    background: rgba(0, 0, 0, 0.8);
  }

  .jump {
    width: 80px;
    height: 80px;
    font-size: 20px;
  }
</style>
