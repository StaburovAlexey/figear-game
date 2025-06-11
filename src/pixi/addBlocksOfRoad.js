import { Sprite, Assets } from 'pixi.js'
import { addTaxi } from './addTaxi'
export async function addObstacles(app, upperY, lowerY, heroHeight) {
  const obstacleWidth = heroHeight / 3
  const obstacleHeight = heroHeight / 3
  const textureNames = ['conus', 'conus2', 'block']
  const obstacles = {
    upper: null,
    lower: null,
  }

  function getRandomTexture() {
    const name = textureNames[Math.floor(Math.random() * textureNames.length)]
    return { name, texture: Assets.get(name) }
  }

  function createObstacle(lineY) {
    const { name, texture } = getRandomTexture()
    const sprite = new Sprite(texture)

    sprite.width = name === 'dirt' ? obstacleWidth * 4 : obstacleWidth
    sprite.height = name === 'dirt' ? obstacleHeight : obstacleHeight

    sprite.x = app.screen.width
    sprite.y = lineY + heroHeight - obstacleHeight
    sprite.zIndex = lineY === lowerY ? 2 : 0

    app.stage.addChild(sprite)
    return sprite
  }

  function update(speed) {
    const flatMapArray = [obstacles.lower, obstacles.upper]
    const findTaxi = flatMapArray.find((el) => el?.type === 'taxi')
    for (const key of ['upper', 'lower']) {
      const obstacle = obstacles[key]
      const lineY = key === 'upper' ? upperY : lowerY
      if (obstacle) {
        // Если ушёл за экран — удалить
        if (obstacle.x + obstacle.width < 0) {
          app.stage.removeChild(obstacle)
          obstacles[key] = null
        }
        if (findTaxi && obstacle.type === 'taxi') {
          obstacle.x -= speed - 2
        } else {
          obstacle.x -= speed
        }
      } else {
        // Если препятствия нет — шанс создать новое
        if (Math.random() < 0.02) {
          if (obstacles.lower?.type != 'taxi') {
            obstacles[key] = createObstacle(lineY)
          }
        }
        if (Math.random() < 0.002) {
          if (!findTaxi) {
            obstacles[key] = addTaxi(app, heroHeight, obstacleHeight, lineY, lowerY)
          }
        }
      }
    }
  }

  const getBlocks = () => {
    return Object.values(obstacles).filter(Boolean)
  }

  return {
    update,
    get blocks() {
      return getBlocks()
    },
  }
}
