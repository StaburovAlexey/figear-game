import { Texture, AnimatedSprite, Assets } from 'pixi.js'
export async function addHero(app, speedGame = 4, heroHeight) {
  const framePaths = [
    '/src/assets/hero/go_1.png',
    '/src/assets/hero/go_2.png',
    '/src/assets/hero/go_3.png',
    '/src/assets/hero/go_4.png',
    '/src/assets/hero/go_5.png',
    '/src/assets/hero/go_6.png',
  ]

  // Загружаем текстуры
  await Assets.load(framePaths)
  const textures = framePaths.map((path) => Texture.from(path))

  // Создаём анимированного персонажа
  const hero = new AnimatedSprite(textures)
  hero.animationSpeed = 0.15
  hero.play()
  hero.width = heroHeight * 2
  hero.height = heroHeight * 2
  // Масштабируем до нужной высоты
  // const scale = heroHeight / hero.height
  // hero.scale.set(scale)

  hero.x = 50
  const obstacleWidth = heroHeight / 1.5
  const jumpDistance = obstacleWidth * 5
  const jumpHeight = heroHeight * 2

  const t = jumpDistance / speedGame
  const gravity = (8 * jumpHeight) / (t * t)
  const jumpSpeed = (4 * jumpHeight) / t

  const upperY = (app.screen.height - hero.height) / 1.19
  const lowerY = (app.screen.height - hero.height) / 1.07

  hero.currentLine = 2
  hero.y = lowerY
  hero.isJumping = false
  hero.jumpVelocity = 0

  hero.update = () => {
    if (hero.isJumping) {
      hero.y -= hero.jumpVelocity
      hero.jumpVelocity -= gravity

      const targetY = hero.currentLine === 1 ? upperY : lowerY
      if (hero.y >= targetY) {
        hero.y = targetY
        hero.isJumping = false
        hero.jumpVelocity = 0
      }
    }
  }

  hero.jump = () => {
    if (!hero.isJumping) {
      hero.isJumping = true
      hero.jumpVelocity = jumpSpeed

      const t = (2 * Math.abs(jumpSpeed)) / gravity
      const dx = speedGame * t
      const landingX = hero.x + dx

      console.log(`Герой приземлится примерно на x = ${landingX.toFixed(2)}`)
    }
  }

  hero.move = (key) => {
    if (key === 'ArrowUp') {
      hero.currentLine = 1
      if (!hero.isJumping) hero.y = upperY
    }

    if (key === 'ArrowDown') {
      hero.currentLine = 2
      if (!hero.isJumping) hero.y = lowerY
    }
  }

  hero.invulnerable = () => {
    const flashingInterval = setInterval(() => {
      hero.alpha = hero.alpha === 1 ? 0.3 : 1
    }, 150)
    hero.flashing = true
    hero.alpha = 0.3
    setTimeout(() => {
      hero.alpha = 1
      hero.flashing = false
      clearInterval(flashingInterval)
    }, 2000)
  }

  hero.zIndex = 2
  return hero
}
