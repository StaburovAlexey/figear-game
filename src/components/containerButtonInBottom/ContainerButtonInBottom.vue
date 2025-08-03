<script setup>
  import { defineProps } from 'vue'
  import Button from '../buttons/Button.vue'
  defineProps({
    buttons: {
      type: Array,
      required: true,
      // [{ name: 'Назад', onClick: () => emit('back') }]
    },
  })
</script>

<template>
  <ul class="menu__list-bottom">
    <li v-for="(btn, index) in buttons" :key="index">
      <Button size="18px" @click="btn.onClick">{{ btn.name }}</Button>
    </li>
  </ul>
</template>

<style scoped>
  .menu__list-bottom {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: fit-content;
    list-style: none;
    text-align: center;
    margin: 0;
    padding: 0 0 10px 0;
  }

  /* button {
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-size: 26px;
    font-weight: 600;
  }

  button:hover {
    cursor: pointer;
    color: rgb(154, 154, 154);
  } */
</style>
