import { ref, reactive, computed } from 'vue'
import { getUserScores, upsertUserScoreAndGetTop } from '../api/api'

const loading = ref(false)
const user = reactive({
  user_id: null,
  name: null,
  scores: [],
})
const getUser = async (userId, userName) => {
  try {
    loading.value = true
    const res = await getUserScores(userId)
    user.user_id = res[0]?.user_id || userId
    user.name = res[0]?.name || userName
    user.scores = res.map((score) => ({
      chapter_id: score.chapter_id,
      mode_id: score.mode_id,
      score: score.score,
    }))
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error.message)
    throw error
  } finally {
    loading.value = false
  }
}
const userScoreForChapterAndMode = (chapter_id, mode_id) => {
  return user.scores.find((score) => score.chapter_id === chapter_id && score.mode_id === mode_id)
}
const updateScores = async (chapter_id, mode_id, score) => {
  try {
    loading.value = true
    const res = await upsertUserScoreAndGetTop(user.user_id, user.name, chapter_id, mode_id, score)
    user.scores = res.map((score) => ({
      chapter_id: score.chapter_id,
      mode_id: score.mode_id,
      score: score.score,
    }))
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error.message)
  } finally {
    loading.value = false
  }
}
export function useUser() {
  return {
    user,
    loading,
    userScoreForChapterAndMode,
    getUser,
    updateScores,
  }
}
