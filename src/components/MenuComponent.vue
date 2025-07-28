<script setup>
  import hero from '../assets/cut_scene/hero.gif'
  import logo from '../assets/FGRbout.png'

  defineEmits(['start-game', 'liderboard', 'education', 'credits', 'exit-menu', 'change-chapter'])
  defineProps({
    gameStatus: {
      type: String,
      default: 'Main-menu',
    },
  })
</script>
<template>
  <div class="menu">
    <img :src="hero" alt="Анимация" class="menu-hero" v-if="gameStatus == 'Main-menu'" />
    <img :src="logo" alt="Анимация" class="menu-logo" v-if="gameStatus == 'Main-menu'" />
    <h2
      style="margin-bottom: 0; margin-top: 30px"
      v-if="gameStatus == 'Game-over' || gameStatus == 'Finish-game'"
    >
      {{ gameStatus == 'Game-over' ? 'Вы проиграли!' : 'Вы пришли вовремя!' }}
    </h2>
    <ul class="menu__list animate" v-if="gameStatus == 'Main-menu'">
      <li><button @click="$emit('change-chapter')">Новая игра</button></li>
      <li><button @click="$emit('liderboard')">Список лидеров</button></li>
      <li><button @click="$emit('education')">Обучение</button></li>
      <li><button @click="$emit('credits')">Команда</button></li>
    </ul>
    <ul class="menu__list" v-if="gameStatus == 'Game-over' || gameStatus == 'Finish-game'">
      <li><button @click="$emit('start-game')">Начать сначала</button></li>
      <li><button @click="$emit('save-result')">Сохранить результат</button></li>
      <li><button @click="$emit('exit-menu')">Выход в меню</button></li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: white;
    font-family: 'pixel';
    position: relative;
    z-index: 2;
  }
  .menu__list {
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    height: fit-content;
    list-style: none;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  /* .menu__list.animate {
    transform: scale(20);
    animation: drop 0.6s ease-out forwards;
    animation-delay: 3s;
  } */
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
  .menu-logo {
    position: fixed; /* ваши координаты */
    top: 10px;
    left: 10px;
    height: 50%;
    aspect-ratio: 1/1;
    object-fit: contain;

    /* подготовка к анимации */
    transform: rotate(45deg);

    opacity: 0;

    /* запуск анимации */
    animation: drop 0.6s ease-out forwards;
    animation-delay: 0.5s;
  }

  /* 3) герой скользит слева направо, стартует спустя 1s */
  .menu-hero {
    z-index: -1;
    position: fixed; /* ваши координаты */
    bottom: 20px;
    left: 20px;
    width: 30%;
    height: 30%;
    object-fit: contain;

    /* подготовка к анимации */
    transform: translateX(-100vw);

    /* запуск анимации */
    animation: slide 8s ease-out forwards infinite;
    animation-delay: 0.5s;
  }

  @keyframes drop {
    from {
      transform: scale(20) rotate(-25deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(-25deg);

      opacity: 1;
    }
  }
  @keyframes slide {
    0% {
      transform: translateX(-100vw);
    }
    50% {
      transform: translateX(200vw);
    }
    51% {
      transform: translateX(200vw) scaleX(-1);
    }
    100% {
      transform: translateX(-100vw) scaleX(-1);
    }
  }
</style>
