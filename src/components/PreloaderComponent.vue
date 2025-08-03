<template>
  <div class="preloader">
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
  defineProps({
    text: {
      type: String,
      default: 'Загрузка...',
    },
  })
</script>

<style scoped>
  .preloader {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'pixel';
    font-weight: 600;
    font-size: 28px;
    color: white;
    z-index: 10;
    pointer-events: none;
    background-color: black;
  }
  .preloader span {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
</style>
