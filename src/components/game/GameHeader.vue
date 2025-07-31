<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    score: Number,
    lives: Number,
    bonus: Number,
    seconds: Number,
    mode: String,
  })
  const time = computed(() => {
    return `${Math.floor((props.seconds % 3600) / 60)} : ${props.seconds % 60}`
  })
</script>

<template>
  <div class="game-header">
    <div class="header-section left">
      <span class="label">SCORE</span>
      <span class="value">{{ Math.floor(score) }}</span>
    </div>
    <div class="header-section center">
      <span class="value" v-if="props.mode == 'normal'">{{ time }}</span>
      <span class="value" style="font-size: 11px;" v-else>Бесконечный режим</span>
    </div>
    <div class="header-section right">
      <img src="../../assets/bonus/bonus1.png" alt="heart" class="icon" />
      <span class="value">x{{ bonus }}</span>
      <img src="../../assets/heart.svg" alt="heart" class="icon" />
      <span class="value">x{{ lives }}</span>
    </div>
  </div>
</template>

<style scoped>
  .game-header {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 2px 20px 0;
    font-family: monospace;
    font-size: 24px;
    color: #f7e4cc;
    image-rendering: pixelated;
    position: absolute;
    top: 0;
    right: 0;
    font-family: 'pixel';
    background-color: rgba(0, 0, 0, 0.5); /* ← затемнённый фон */
    backdrop-filter: blur(2px); /* ← лёгкий блюр по желанию */
  }

  .header-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-section {
    font-family: 'pixel';
    font-size: 26px;
    font-weight: 600;
  }
  .header-section.center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-section.left {
    position: absolute;
    left: 25%;
    transform: translateX(-25%);
  }
  .header-section.right {
    position: absolute;
    left: 75%;
    transform: translateX(-75%);
  }
  .header-section.bonus {
    position: absolute;
    right: 110px;
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
