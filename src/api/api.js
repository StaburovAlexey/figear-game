import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_API_URL
const supabaseKey = import.meta.env.VITE_API_KEY
const usersTable = import.meta.env.VITE_USERS_TABLE
const scoresTable = import.meta.env.VITE_SCORES_TABLE
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getOrCreateUserWithScores({ telegram_id, username }) {
  let user

  // 1. Поиск пользователя по telegram_id
  const { data: users, error: userError } = await supabase
    .from(usersTable)
    .select('*')
    .eq('telegram_id', telegram_id)
    .limit(1)

  if (userError) {
    throw new Error('Ошибка при получении пользователя: ' + userError.message)
  }

  if (users && users.length > 0) {
    user = { ...users[0] }
  } else {
    // 2. Если не найден — создать нового
    const { data: newUser, error: createError } = await supabase
      .from(usersTable)
      .insert([{ telegram_id, name: username, alerts: true }])
      .select()
      .single()

    if (createError) {
      throw new Error('Ошибка при создании пользователя: ' + createError.message)
    }

    user = { ...newUser }
  }

  // 3. Получить все строки из scores для uuid пользователя
  const scores = await getScoresByUserUuid(user.uuid)

  return {
    ...user,
    scores,
  }
}
export async function getScoresByUserUuid(uuid) {
  const { data: scores, error } = await supabase.from(scoresTable).select('*').eq('uuid', uuid)

  if (error) {
    throw new Error('Ошибка при получении scores по uuid: ' + error.message)
  }

  return scores
}

export async function upsertScore({ uuid, chapter_id, mode_id, score, name }) {
  const { error } = await supabase
    .from(scoresTable)
    .upsert([{ uuid, chapter_id, mode_id, score, name }], {
      onConflict: ['uuid', 'chapter_id', 'mode_id'],
    })

  if (error) {
    throw new Error('Ошибка при upsert score: ' + error.message)
  }
}
export async function getScoresByChapterAndMode(chapter_id, mode_id) {
  const { data, error } = await supabase
    .from(scoresTable)
    .select(
      `
      uuid,
      chapter_id,
      mode_id,
      score,
      ${usersTable} (
        name,
        alerts
      )
    `
    )
    .eq('chapter_id', chapter_id)
    .eq('mode_id', mode_id)
    .order('score', { ascending: false })

  if (error) {
    throw new Error('Ошибка при получении списка score: ' + error.message)
  }

  return data
}
export async function updateUserAlerts(uuid, alerts) {
  const { data, error } = await supabase
    .from(usersTable)
    .update({ alerts })
    .eq('uuid', uuid)
    .select()
    .single()

  if (error) {
    throw new Error('Ошибка при обновлении alerts: ' + error.message)
  }

  return data
}
