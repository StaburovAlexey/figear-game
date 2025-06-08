import { Graphics } from 'pixi.js'

export async function addHero(app, speedGame = 4, heroHeight) {
  const heroRect = new Graphics()
  heroRect.beginFill(0xff0000)
  heroRect.drawRect(0, 0, app.screen.width / 8, heroHeight)
  heroRect.endFill()
  heroRect.x = 50
  const obstacleWidth = heroHeight / 1.5
  const jumpDistance = obstacleWidth * 5 // хотим фиксированную дальность
  const jumpHeight = heroHeight * 2 // хотим фиксированную высоту

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
    const flashingInterval = setInterval(() => {
      if (heroRect.alpha === 1) heroRect.alpha = 0.3
      else heroRect.alpha = 1
    }, 150)
    heroRect.flashing = true
    flashingInterval
    heroRect.alpha = 0.3
    setTimeout(() => {
      heroRect.alpha = 1
      heroRect.flashing = false
      clearInterval(flashingInterval)
    }, 2000)
  }
  heroRect.zIndex = 2
  return heroRect
}
