<script setup>
  import { defineProps } from 'vue'

  defineProps({
    size: {
      type: String,
      default: '26px',
    },
  })
</script>

<template>
  <button :style="{ fontSize: size }">
    <slot>Выход в меню</slot>
  </button>
</template>

<style scoped>
  button {
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-weight: 600;
  }
  button:hover {
    cursor: pointer;
    color: rgb(154, 154, 154);
  }
</style>
