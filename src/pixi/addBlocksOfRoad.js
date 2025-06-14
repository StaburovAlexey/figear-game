import { Sprite, Assets } from 'pixi.js'
import { addTaxi } from './addTaxi'

export async function addObstacles(app, upperY, lowerY, heroHeight) {
  const obstacleWidth = heroHeight / 3
  const obstacleHeight = heroHeight / 3
  const textureNames = ['conus', 'conus2', 'block']

  const obstacles = {
    upper: [],
    lower: [],
  }

  function getRandomTexture() {
    const name = textureNames[Math.floor(Math.random() * textureNames.length)]
    return { name, texture: Assets.get(name), type: 'block' }
  }

  function getRandomBonus() {
    const bonusNames = ['bonus1', 'bonus2', 'bonus3']
    const name = bonusNames[Math.floor(Math.random() * bonusNames.length)]
    return { texture: Assets.get(name), type: 'bonus' }
  }
  function createBonus(lineY) {
    const { texture, type } = getRandomBonus()
    const sprite = new Sprite(texture)

    sprite.width = obstacleWidth
    sprite.height = obstacleHeight

    sprite.x = app.screen.width
    sprite.y = lineY + heroHeight - obstacleHeight
    sprite.zIndex = lineY === lowerY ? 2 : 0
    sprite.type = type
    app.stage.addChild(sprite)
    return sprite
  }
  function createObstacle(lineY) {
    const { name, texture, type } = getRandomTexture()
    const sprite = new Sprite(texture)

    sprite.width = name === 'dirt' ? obstacleWidth * 4 : obstacleWidth
    sprite.height = obstacleHeight

    sprite.x = app.screen.width
    sprite.y = lineY + heroHeight - obstacleHeight
    sprite.zIndex = lineY === lowerY ? 2 : 0

    sprite.type = type
    app.stage.addChild(sprite)
    return sprite
  }

  function update(speed) {
    for (const key of ['upper', 'lower']) {
      const lineY = key === 'upper' ? upperY : lowerY
      const list = obstacles[key]

      for (let i = list.length - 1; i >= 0; i--) {
        const obs = list[i]
        if (obs.x + obs.width < 0) {
          app.stage.removeChild(obs)
          list.splice(i, 1)
        } else {
          obs.x -= obs.type === 'taxi' ? speed - 2 : speed
        }
      }

      const hasBlockOrTaxi = list.some((o) => o.type === 'taxi' || o.type === 'block')
      const hasBonus = list.some((o) => o.type === 'bonus')
      const hasTaxiLowerLine = obstacles.lower.some((o) => o.type === 'taxi')
      if (!hasBlockOrTaxi && !hasTaxiLowerLine && Math.random() < 0.02) {
        list.push(createObstacle(lineY))
      }
      if (!hasBonus && Math.random() < 0.0002) {
        list.push(createBonus(lineY))
      }

      const hasTaxiGlobal = obstacles.upper.concat(obstacles.lower).some((o) => o.type === 'taxi')
      if (!hasTaxiGlobal && !hasBlockOrTaxi && Math.random() < 0.002) {
        const taxi = addTaxi(app, heroHeight, obstacleHeight, lineY, lowerY)
        taxi.type = 'taxi'
        list.push(taxi)
      }
    }
  }

  const getBlocks = () => {
    return [...obstacles.upper, ...obstacles.lower]
  }

  return {
    update,
    get blocks() {
      return getBlocks()
    },
  }
}
