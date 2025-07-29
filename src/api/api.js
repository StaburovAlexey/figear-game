import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_API_URL
const supabaseKey = import.meta.env.VITE_API_KEY
const tableName = import.meta.env.VITE_LEADERBOARD_TABLE

const supabase = createClient(supabaseUrl, supabaseKey)

export async function getTopScoresByChapter(chapter_id, mode_id) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('chapter_id', chapter_id)
    .eq('mode_id', mode_id)
    .order('score', { ascending: false })

  if (error) {
    console.error('Ошибка получения топа по главе и режиму:', error.message)
    throw error
  }

  return data
}

export async function upsertUserScoreAndGetTop(user_id, chapter_id, mode_id, score) {
  const { error: upsertError } = await supabase
    .from(tableName)
    .upsert(
      { user_id, chapter_id, mode_id, score },
      { onConflict: ['user_id', 'chapter_id', 'mode_id'] }
    )

  if (upsertError) {
    console.error('Ошибка при upsert очков:', upsertError.message)
    throw upsertError
  }

  const { data, error: fetchError } = await supabase
    .from(tableName)
    .select('*')
    .eq('chapter_id', chapter_id)
    .eq('mode_id', mode_id)
    .order('score', { ascending: false })

  if (fetchError) {
    console.error('Ошибка получения топа:', fetchError.message)
    throw fetchError
  }

  return data
}

export async function getUserScores(user_id) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('user_id', user_id)
    .order('chapter_id', { ascending: true })

  if (error) {
    console.error('Ошибка при получении очков пользователя:', error.message)
    throw error
  }

  return data
}
