import { AnimatedSprite, Assets } from 'pixi.js'

export async function addHero(heroHeight, upperY, lowerY) {
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

  const scale = heroHeight / hero.height
  hero.scale.set(scale)
  hero.x = 100

  const jumpHeight = heroHeight / 1.3
  const jumpDistance = (heroHeight / 1.5) * 11

  // Состояние героя
  hero.y = lowerY
  hero.currentLine = 2
  hero.isJumping = false
  hero.jumpVelocity = 0
  hero._gravity = 0

  hero.zIndex = 2

  hero.update = () => {
    if (hero.isJumping) {
      hero.y -= hero.jumpVelocity
      hero.jumpVelocity -= hero._gravity

      const targetY = hero.currentLine === 1 ? upperY : lowerY
      if (hero.y >= targetY) {
        hero.y = targetY
        hero.isJumping = false
        hero.jumpVelocity = 0

        hero.textures = rideTextures
        hero.loop = true
        hero.animationSpeed = animationSpeed
        hero.play()
      }
    }
  }

  hero.jump = (speed) => {
    if (speed < 5) {
      speed = 5
    }
    if (!hero.isJumping) {
      const t = jumpDistance / speed
      const gravity = (8 * jumpHeight) / (t * t)
      const jumpSpeed = (4 * jumpHeight) / t

      hero.isJumping = true
      hero.jumpVelocity = jumpSpeed
      hero._gravity = gravity

      hero.textures = jumpTextures
      hero.loop = false
      hero.animationSpeed = animationSpeed
      hero.gotoAndPlay(0)

      const dx = speed * ((2 * jumpSpeed) / gravity)
      console.log(`Герой приземлится примерно на x = ${(hero.x + dx).toFixed(2)}`)
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

  // ✨ Мигание при неуязвимости
  hero.invulnerable = () => {
    const flashingInterval = setInterval(() => {
      hero.alpha = hero.alpha === 1 ? 0.3 : 1
    }, 150)

    hero.flashing = true
    hero.alpha = 0.3

    setTimeout(() => {
      clearInterval(flashingInterval)
      hero.alpha = 1
      hero.flashing = false
    }, 2000)
  }

  return hero
}
