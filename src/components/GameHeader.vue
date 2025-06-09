<script setup>
  defineProps({
    score: Number,
    lives: Number,
    bullets: Number,
    coins: Number,
  })
</script>

<template>
  <div class="game-header">
    <div class="header-section left">
      <span class="label">SCORE</span>
      <span class="value">{{ Math.floor(score) }}</span>
    </div>
    <div class="header-section center">
      <img src="" alt="heart" class="icon" />
      <span class="value">x{{ lives }}</span>
    </div>
    <div class="header-section right">
      <span class="value">{{ bullets }}</span>
      <img src="" alt="bullet" class="icon" />
    </div>
  </div>
</template>

<style scoped>
  .game-header {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    /* background-color: #2b2b38; тёмно-синий/фиолетовый */
    /* border: 4px solid #111; почти чёрная рамка */
    padding: 10px 20px;
    font-family: monospace;
    font-size: 24px;
    color: #f7e4cc;
    image-rendering: pixelated;
    position: absolute;
    top: 0;
    right: 0;
  }

  .header-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-section.center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .coin-section {
    position: absolute;
    right: 20px;
    bottom: -50px;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #2b2b38;
    border: 4px solid #111;
    padding: 4px 12px;
  }

  .icon,
  .coin-icon {
    width: 24px;
    height: 24px;
    filter: drop-shadow(1px 1px 0 #000);
  }
</style>
