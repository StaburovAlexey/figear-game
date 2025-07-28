// scripts/afterBuild.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import archiver from 'archiver'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mode = process.argv[2] || 'development'
const distPath = path.resolve(__dirname, '../dist')
const envFileName = `.env.${mode}`
const envFilePath = path.resolve(__dirname, `../${envFileName}`)
const targetEnvPath = path.join(distPath, '.env')

// Проверка наличия .env
if (!fs.existsSync(envFilePath)) {
  console.error(`❌ Файл ${envFileName} не найден`)
  process.exit(1)
}

// Копируем .env в dist
fs.copyFileSync(envFilePath, targetEnvPath)
console.log(`✅ Добавлен ${envFileName} в dist`)

// Получаем имя архива
let zipSuffix = ''

if (mode === 'production') {
  try {
    const commitMessage = execSync('git log -1 --pretty=%s').toString().trim()
    // Удаляем недопустимые символы и пробелы заменяем на _
    const sanitized = commitMessage
      .replace(/[<>:"/\\|?*]+/g, '')
      .replace(/\s+/g, '_')
      .slice(0, 50) // Ограничим длину имени
    zipSuffix = sanitized || 'no-commit-message'
  } catch (err) {
    console.warn('⚠️ Не удалось получить имя последнего коммита. Используется fallback.')
    zipSuffix = 'unknown-commit'
  }
} else {
  const now = new Date()
  const pad = (n) => n.toString().padStart(2, '0')
  const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`
  zipSuffix = dateStr
}

const zipName = `dist-${mode}-${zipSuffix}.zip`
const output = fs.createWriteStream(path.resolve(__dirname, `../${zipName}`))
const archive = archiver('zip', { zlib: { level: 9 } })

output.on('close', () => {
  console.log(`✅ Архив создан: ${zipName} (${archive.pointer()} байт)`)
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)
archive.directory(distPath, false)
archive.finalize()
