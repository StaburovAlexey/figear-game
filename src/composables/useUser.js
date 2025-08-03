import { ref, reactive, computed } from 'vue'
import {
  getOrCreateUserWithScores,
  getScoresByUserUuid,
  upsertScore,
  updateUserAlerts,
} from '../api/api'

const loading = ref(false)
const user = ref({})
const getUser = async (telegram_id, username) => {
  try {
    loading.value = true
    console.log('getUser', telegram_id, username)
    const res = await getOrCreateUserWithScores(telegram_id, username)
    user.value = res
    console.log('user', user.value)
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error.message)
    throw error
  } finally {
    loading.value = false
  }
}
const userScoreForChapterAndMode = (chapter_id, mode_id) => {
  return (
    user.value.scores.find(
      (score) => score.chapter_id === chapter_id && score.mode_id === mode_id
    ) || null
  )
}
const updateScores = async (chapter_id, mode_id, score) => {
  console.log('user', user.value)
  try {
    loading.value = true
    console.log('user', user.value)
    user.value.scores = await upsertScore({
      uuid: user.value.uuid,
      chapter_id,
      mode_id,
      score,
    })
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
