import { AnimatedSprite, Assets } from 'pixi.js'
export async function addHero(app, speedGame = 4, heroHeight, upperY, lowerY) {
  const rideAliases = ['go_1', 'go_2', 'go_3', 'go_4', 'go_5', 'go_6']
  const jumpAliases = [
    'jump_1',
    'jump_2',
    'jump_3',
    'jump_4',
    'jump_5',
    'jump_6',
    'jump_7',
    'jump_8',
    'jump_9',
  ]
  const rideTextures = rideAliases.map((p) => Assets.get(p))
  const jumpTextures = jumpAliases.map((p) => Assets.get(p))

  const animationSpeed = 0.15

  const hero = new AnimatedSprite(rideTextures)
  hero.animationSpeed = animationSpeed
  hero.loop = true
  hero.play()

  // Масштаб по высоте
  const scale = heroHeight / hero.height
  hero.scale.set(scale)
  hero.x = 50

  // Прыжковые переменные
  const obstacleWidth = heroHeight / 1.5
  const jumpDistance = obstacleWidth * 7
  const jumpHeight = heroHeight / 1.3

  const t = jumpDistance / speedGame
  const gravity = (8 * jumpHeight) / (t * t)
  const jumpSpeed = (4 * jumpHeight) / t

  // const upperY = (app.screen.height - hero.height) / 1.19
  // const lowerY = (app.screen.height - hero.height) / 1.07

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

        // Вернуть анимацию езды
        hero.textures = rideTextures
        hero.loop = true
        hero.animationSpeed = animationSpeed
        hero.play()
      }
    }
  }

  hero.jump = () => {
    if (!hero.isJumping) {
      hero.isJumping = true
      hero.jumpVelocity = jumpSpeed
      // Переключаем на прыжковую анимацию
      hero.textures = jumpTextures
      hero.loop = false
      hero.animationSpeed = animationSpeed
      hero.gotoAndPlay(0)

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
