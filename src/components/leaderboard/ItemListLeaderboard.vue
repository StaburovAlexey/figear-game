<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  })
</script>
<template>
  <li :class="{ active: isUser }">
    <span class="position">{{ props.index + 1 }}.</span>
    <span class="name">{{ props.item.user.name }}</span>
    <span class="score">{{ props.item.score }}</span>
  </li>
</template>

<style lang="css" scoped>
  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }
  .position {
    width: 24px;
    flex-shrink: 0;
  }
  .name {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
  }
  .score {
    margin-left: auto;
    white-space: nowrap;
  }
  .active {
    color: yellow;
    font-weight: bold;
  }
</style>
