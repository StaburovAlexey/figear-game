import { Sprite, Texture, Assets } from 'pixi.js'
export async function addObstacles(app, speedGame, upperY, lowerY, heroHeight) {
  const obstacleWidth = heroHeight / 1.5
  const obstacleHeight = heroHeight / 1.5
  const spawnInterval = 2000 // мс между спавнами

  const textureNames = ['conus', 'conus2', 'block', 'dirt']
  const texturePaths = {
    conus: '/src/assets/background/conus.png',
    conus2: '/src/assets/background/conus2.png',
    block: '/src/assets/background/block.png',
    // dirt: '/src/assets/background/dirt.png',
  }
  // Загружаем все текстуры заранее
  await Assets.load(Object.entries(texturePaths).map(([alias, src]) => ({ alias, src })))
  const obstacles = {
    upper: null,
    lower: null,
  }
  function getRandomTexture() {
    const name = textureNames[Math.floor(Math.random() * textureNames.length)]
    return { name, texture: Texture.from(name) }
  }
  async function createObstacle(lineY) {
    const { name, texture } = getRandomTexture()
    const sprite = new Sprite(texture)

    // Размер можно задать вручную или подогнать по герою
    sprite.width = name == 'dirt' ? obstacleWidth * 4 : obstacleWidth
    sprite.height = name == 'dirt' ? obstacleHeight : obstacleHeight

    // sprite.anchor.set(0, 0) // если хочешь левый верх ка
    sprite.x = app.screen.width
    sprite.y = lineY + heroHeight - obstacleHeight // 👈 выравниваем по низу героя
    sprite.zIndex = 1
    app.stage.addChild(sprite)
    return sprite
  }

  app.ticker.add(() => {
    for (const key of ['upper', 'lower']) {
      const obstacle = obstacles[key]
      if (obstacle) {
        obstacle.x -= speedGame

        if (obstacle.x + obstacle.width < 0) {
          app.stage.removeChild(obstacle)
          obstacles[key] = null
        }
      }
    }
  })

  setInterval(async () => {
    if (!obstacles.upper && Math.random() < 0.5) {
      obstacles.upper = await createObstacle(upperY)
    }
    if (!obstacles.lower && Math.random() < 0.5) {
      obstacles.lower = await createObstacle(lowerY)
    }
  }, spawnInterval)
}
