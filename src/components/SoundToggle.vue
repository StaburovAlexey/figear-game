<!-- components/SoundToggle.vue -->
<template>
  <div class="sound-control">
    <button
      class="sound-button"
      @click="toggleAudio"
      :aria-label="isPlaying ? 'Отключить звук' : 'Включить звук'"
    >
      <!-- Иконка: звук включён -->
      <svg v-if="isPlaying" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3z" />
        <path d="M14.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02z" />
      </svg>
      <!-- Иконка: звук выключён или ошибка -->
      <svg v-else viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3z" />
        <line x1="16" y1="8" x2="22" y2="14" stroke="white" stroke-width="2" />
        <line x1="22" y1="8" x2="16" y2="14" stroke="white" stroke-width="2" />
      </svg>
    </button>

    <div v-if="hasError" class="tooltip">
      Мы очень старались над музыкой — пожалуйста, включите звук!
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import themeMusic from '../assets/cut_scene/PixelRush.mp3'

  const audio = new Audio(themeMusic)
  const isPlaying = ref(false)
  const hasError = ref(false)

  onMounted(() => {
    audio.loop = true
    audio.volume = 0.5

    audio
      .play()
      .then(() => {
        isPlaying.value = true
        hasError.value = false
      })
      .catch((err) => {
        console.warn('Autoplay blocked:', err)
        isPlaying.value = false
        hasError.value = true
        audio.pause()
      })
  })

  onBeforeUnmount(() => {
    audio.pause()
  })

  function toggleAudio() {
    if (isPlaying.value) {
      audio.pause()
      isPlaying.value = false
    } else {
      audio
        .play()
        .then(() => {
          isPlaying.value = true
          hasError.value = false
        })
        .catch((err) => {
          console.warn('Play failed:', err)
          hasError.value = true
          isPlaying.value = false
        })
    }
  }
</script>

<style scoped>
  .sound-control {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  .sound-button {
    background: rgba(0, 0, 0, 0.6);
    border: none;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sound-button svg {
    width: 24px;
    height: 24px;
    fill: white;
  }

  .tooltip {
    font-family: 'pixel';
    position: absolute;
    top: 38px;
    right: 0;
    background: rgba(41, 32, 32, 0.8);
    color: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 4px;
    max-width: 50vw;
    text-align: center;
    overflow-wrap: break-word;
  }
</style>
