import { Graphics } from 'pixi.js'

export async function addHero(app, gravityGame, speedGame) {
  console.log('gravityGame:', gravityGame) // ✅ отладка
  console.log('speedGame:', speedGame)
  const heroRect = new Graphics()
  const gravity = gravityGame
  const jumpDistance = 250 // px — хотим фиксированную дальность
  const t = jumpDistance / speedGame
  const jumpSpeed = (gravity * t) / 2 // ← рассчитываем!
  console.log('jumpSpeed:', jumpSpeed) // ✅ отладка
  // Нарисовать прямоугольник героя
  heroRect.beginFill(0xff0000)
  heroRect.drawRect(0, 0, app.screen.width / 7, app.screen.height / 7)
  heroRect.endFill()

  heroRect.x = 50

  // Позиции для двух линий
  const upperY = (app.screen.height - heroRect.height) / 1.19
  const lowerY = (app.screen.height - heroRect.height) / 1.07

  // Текущая линия: 1 = верхняя, 2 = нижняя
  heroRect.currentLine = 2
  heroRect.y = lowerY

  heroRect.isJumping = false
  heroRect.jumpVelocity = 0

  // Прыжок и перемещение
  addMoveHero(heroRect, upperY, lowerY, jumpSpeed, gravity, speedGame)
  console.log('gravity:', gravity)
  console.log('jumpSpeed:', jumpSpeed)
  console.log('speedGame:', speedGame)

  heroRect.update = () => {
    if (heroRect.isJumping) {
      heroRect.y += heroRect.jumpVelocity
      heroRect.jumpVelocity += gravity

      // Если герой приземлился обратно на линию
      const targetY = heroRect.currentLine === 1 ? upperY : lowerY
      if (heroRect.y >= targetY) {
        heroRect.y = targetY
        heroRect.isJumping = false
        heroRect.jumpVelocity = 0
      }
    }
  }

  return heroRect
}

function addMoveHero(hero, upperY, lowerY, jumpSpeed, gravity, speedGame) {
  document.addEventListener('keydown', (event) => {
    const key = event.key

    if (key === 'ArrowUp') {
      hero.currentLine = 1
      if (!hero.isJumping) hero.y = upperY
    }

    if (key === 'ArrowDown') {
      hero.currentLine = 2
      if (!hero.isJumping) hero.y = lowerY
    }

    if (key === ' ' || key === 'Space') {
      if (!hero.isJumping) {
        hero.isJumping = true
        hero.jumpVelocity = -jumpSpeed

        // === Расчёт точки приземления ===
        const t = (2 * Math.abs(jumpSpeed)) / gravity
        const dx = speedGame * t
        const landingX = hero.x + dx

        console.log(`Герой приземлится примерно на x = ${landingX.toFixed(2)}`)
      }
    }
  })
}
