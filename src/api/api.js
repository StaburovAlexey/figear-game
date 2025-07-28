import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_API_URL
const supabaseKey = import.meta.env.VITE_API_KEY
const tableName = import.meta.env.VITE_LEADERBOARD_TABLE

const supabase = createClient(supabaseUrl, supabaseKey)

export async function getTopScores() {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('score', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Ошибка получения топа:', error.message)
    throw error
  }

  return data
}

export async function upsertScore(user_id, score) {
  const { error: upsertError } = await supabase
    .from(tableName)
    .upsert({ user_id, score }, { onConflict: 'user_id' })

  if (upsertError) {
    console.error('Ошибка upsert:', upsertError.message)
    throw upsertError
  }

  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('score', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Ошибка получения топа:', error.message)
    throw error
  }

  return data
}
