<template>
  <div v-if="showOverlay" class="orientation-overlay">
    <p>Пожалуйста, поверните устройство горизонтально</p>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  const emit = defineEmits(['orientation-changed'])
  const showOverlay = ref(false)

  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent)
  }

  function checkOrientation() {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches
    showOverlay.value = isMobile() && !isLandscape
    emit('orientation-changed', showOverlay.value ? 'Orient-guard' : 'Main-menu')
  }

  onMounted(() => {
    checkOrientation()
    window.addEventListener('orientationchange', checkOrientation)
    window.addEventListener('resize', checkOrientation)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('orientationchange', checkOrientation)
    window.removeEventListener('resize', checkOrientation)
  })
</script>

<style scoped>
  .orientation-overlay {
    position: absolute;
    z-index: 9999;
    padding: 5px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    text-align: center;
    font-family: 'pixel';
    font-weight: 600;
  }
</style>
