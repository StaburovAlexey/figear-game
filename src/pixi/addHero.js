import { Graphics } from 'pixi.js'

export async function addHero(app, speedGame = 4) {
  const heroRect = new Graphics()
  heroRect.beginFill(0xff0000)
  heroRect.drawRect(0, 0, app.screen.width / 8, app.screen.height / 7)
  heroRect.endFill()
  heroRect.x = 50

  const jumpDistance = 200 // хотим фиксированную дальность
  const jumpHeight = 100 // хотим фиксированную высоту

  const t = jumpDistance / speedGame
  const gravity = (8 * jumpHeight) / (t * t)
  const jumpSpeed = (4 * jumpHeight) / t

  const upperY = (app.screen.height - heroRect.height) / 1.19
  const lowerY = (app.screen.height - heroRect.height) / 1.07

  heroRect.currentLine = 2
  heroRect.y = lowerY
  heroRect.isJumping = false
  heroRect.jumpVelocity = 0

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
  heroRect.jump = () => {
    if (!heroRect.isJumping) {
      heroRect.isJumping = true
      heroRect.jumpVelocity = jumpSpeed

      // === Расчёт точки приземления ===
      const t = (2 * Math.abs(jumpSpeed)) / gravity
      const dx = speedGame * t
      const landingX = heroRect.x + dx

      console.log(`Герой приземлится примерно на x = ${landingX.toFixed(2)}`)
    }
  }
  heroRect.move = (key) => {
    if (key === 'ArrowUp') {
      heroRect.currentLine = 1
      if (!heroRect.isJumping) heroRect.y = upperY
    }

    if (key === 'ArrowDown') {
      heroRect.currentLine = 2
      if (!heroRect.isJumping) heroRect.y = lowerY
    }
  }
  heroRect.invulnerable = () => {
    heroRect.flashing = true
    heroRect.alpha = 0.3
    setTimeout(() => {
      heroRect.alpha = 1
      heroRect.flashing = false
    }, 2000)
  }
  heroRect.zIndex = 2
  return heroRect
}
