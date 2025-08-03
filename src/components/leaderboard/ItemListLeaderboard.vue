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
    animated: {
      type: Boolean,
      default: false,
    },
  })
</script>
<template>
  <li
    :class="{
      active: isUser,
      animated_user: isUser && animated,
      animated_text: !isUser && animated,
    }"
  >
    <span class="position">{{ props.item.rank }}.</span>
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
  .animated_user {
    transform: scale(20);
    opacity: 0;
    animation: drop 0.4s ease-out 0.8s forwards;
  }

  .animated_text {
    opacity: 0;
    animation: fadeIn 0.4s ease-out 0.4s forwards;
  }
  @keyframes drop {
    from {
      transform: scale(20);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
