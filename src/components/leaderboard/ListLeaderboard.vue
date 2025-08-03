<script setup>
  import { defineProps, onMounted } from 'vue'
  import ItemListLeaderboard from './ItemListLeaderboard.vue'
  import { useUser } from '../../composables/useUser'
  const props = defineProps({
    leaderboard: {
      type: Array,
      required: true,
    },
  })
  const { user } = useUser()
</script>
<template>
  <ol>
    <ItemListLeaderboard
      v-for="(item, index) in props.leaderboard"
      :key="item.user_id"
      :index
      :item
      :is-user="item.uuid == user?.uuid"
    />
  </ol>
</template>
<style lang="css">
  .me {
    color: yellow;
    font-weight: bold;
  }
</style>
