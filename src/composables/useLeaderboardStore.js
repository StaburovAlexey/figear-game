import { ref } from 'vue'
import { getScoresByChapterAndMode } from '../api/api'
const loadingLeaderboard = ref(false)
const leaderboard = ref([])
const updateLeaderboard = async (chapter_id, mode_id) => {
  try {
    loadingLeaderboard.value = true
    const scores = await getScoresByChapterAndMode(chapter_id, mode_id)
    leaderboard.value = scores
  } catch (error) {
    console.error(error)
  } finally {
    loadingLeaderboard.value = false
  }
}

export function useLeaderboardStore() {
  return {
    updateLeaderboard,
    leaderboard,
    loadingLeaderboard,
  }
}
