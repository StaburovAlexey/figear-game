import { Graphics } from 'pixi.js'

export async function addHero(app, speedGame = 4) {
  const heroRect = new Graphics()
  heroRect.beginFill(0xff0000)
  heroRect.drawRect(0, 0, app.screen.width / 7, app.screen.height / 7)
  heroRect.endFill()

  heroRect.x = 50

  const jumpDistance = 200 // хотим фиксированную дальность
  const jumpHeight = 60 // хотим фиксированную высоту

  const t = jumpDistance / speedGame
  const gravity = (8 * jumpHeight) / (t * t)
  const jumpSpeed = (4 * jumpHeight) / t

  console.log(`gravity: ${gravity.toFixed(2)}, jumpSpeed: ${jumpSpeed.toFixed(2)}`)

  const upperY = (app.screen.height - heroRect.height) / 1.19
  const lowerY = (app.screen.height - heroRect.height) / 1.07

  heroRect.currentLine = 2
  heroRect.y = lowerY
  heroRect.isJumping = false
  heroRect.jumpVelocity = 0

  addMoveHero(heroRect, upperY, lowerY, jumpSpeed, gravity, speedGame)

  heroRect.update = () => {
    if (heroRect.isJumping) {
      heroRect.y -= heroRect.jumpVelocity
      heroRect.jumpVelocity -= gravity

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
        hero.jumpVelocity = jumpSpeed

        // === Расчёт точки приземления ===
        const t = (2 * Math.abs(jumpSpeed)) / gravity
        const dx = speedGame * t
        const landingX = hero.x + dx

        console.log(`Герой приземлится примерно на x = ${landingX.toFixed(2)}`)
      }
    }
  })
}
