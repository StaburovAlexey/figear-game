<script setup>
  const emit = defineEmits(['exit-menu'])
</script>
<template>
  <div class="save-result">
    <h3>Введите имя</h3>
    <div class="save-result__input-container">
      <input type="text" class="save-result__input" />
      <button class="save-result__btn-save">Cохранить</button>
    </div>

    <button class="save-result__btn-save" @click="emit('exit-menu')">Вернуться в меню</button>
  </div>
</template>
<style lang="css" scoped>
  .save-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    color: white;
    font-family: 'pixel';
    font-weight: 600;
  }
  .save-result__input-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
  .save-result__input {
    color: white;
    background-color: transparent;
    border-color: white;
    border-top: none;
    border-left: none;
    border-right: none;
    text-align: center;
  }
  .save-result__input:focus {
    outline: none;
  }

  .save-result__btn-save {
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-size: 16px;
    font-weight: 600;
  }
  .save-result__btn-save:hover {
    cursor: pointer;
    color: rgb(154, 154, 154);
  }
</style>
