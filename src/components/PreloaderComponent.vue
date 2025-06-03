<template>
  <div class="preloader">
    <svg
      class="bike"
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading bike animation"
    >
      <!-- Колёса -->
      <circle class="wheel" cx="30" cy="60" r="20" />
      <circle class="wheel" cx="90" cy="60" r="20" />

      <!-- Рама -->
      <polyline
        points="30,60 50,30 70,30 90,60"
        fill="none"
        stroke="#f1c40f"
        stroke-width="4"
        stroke-linejoin="round"
      />

      <!-- Руль -->
      <line
        x1="70"
        y1="30"
        x2="80"
        y2="15"
        stroke="#f1c40f"
        stroke-width="4"
        stroke-linecap="round"
      />

      <!-- Седло -->
      <line
        x1="50"
        y1="30"
        x2="40"
        y2="15"
        stroke="#f1c40f"
        stroke-width="4"
        stroke-linecap="round"
      />

      <!-- Педаль -->
      <circle class="pedal" cx="50" cy="60" r="6" fill="#f39c12" />
      <line
        class="pedal-arm"
        x1="50"
        y1="60"
        x2="70"
        y2="55"
        stroke="#f39c12"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>

    <div class="beer-progress">
      <div
        v-for="n in maxBeers"
        :key="n"
        class="beer-can"
        :class="{ filled: n <= filledBeers }"
      ></div>
    </div>

    <div class="loading-text">Загрузка... {{ progress }}%</div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const maxBeers = 5
  const filledBeers = ref(0)
  const progress = ref(0)

  onMounted(() => {
    const interval = setInterval(() => {
      if (filledBeers.value < maxBeers) {
        filledBeers.value++
        progress.value = Math.floor((filledBeers.value / maxBeers) * 100)
      } else {
        clearInterval(interval)
      }
    }, 500)
  })
</script>

<style scoped>
  .preloader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #1e1e1e;
    color: #f1c40f;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .bike {
    width: 120px;
    height: 80px;
    margin-bottom: 40px;
  }

  .wheel {
    stroke: #f1c40f;
    stroke-width: 4;
    fill: none;
  }

  .spokes {
    stroke: #f1c40f;
    stroke-width: 2;
    transform-origin: center center;
  }

  .pedal {
    fill: #f39c12;
    transform-origin: 50px 60px;
    animation: pedal-spin 1.2s linear infinite;
  }

  .pedal-arm {
    stroke: #f39c12;
    stroke-width: 4;
    stroke-linecap: round;
    transform-origin: 50px 60px;
    animation: pedal-spin 1.2s linear infinite;
  }

  .beer-progress {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .beer-can {
    width: 20px;
    height: 40px;
    border: 2px solid #f39c12;
    border-radius: 4px;
    background-color: transparent;
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .beer-can.filled {
    background-color: #f39c12;
    box-shadow: 0 0 8px #f39c12aa;
  }

  .loading-text {
    font-size: 18px;
    color: #f39c12;
    animation: blink 1.4s infinite;
    user-select: none;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes pedal-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
