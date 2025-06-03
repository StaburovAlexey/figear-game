import { Graphics } from 'pixi.js'
export async function addObstacles(app, speedGame, upperY, lowerY, heroHeight) {
  const obstacleWidth = 40
  const obstacleHeight = 40
  const spawnInterval = 2000 // мс между спавнами

  const obstacles = {
    upper: null,
    lower: null,
  }

  function createObstacle(lineY) {
    const obstacle = new Graphics()
    obstacle.beginFill(0x000000)
    obstacle.drawRect(0, 0, obstacleWidth, obstacleHeight)
    obstacle.endFill()

    obstacle.x = app.screen.width
    obstacle.y = lineY + heroHeight - obstacleHeight // 👈 выравниваем по низу героя
    obstacle.zIndex = 1
    app.stage.addChild(obstacle)
    return obstacle
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

  setInterval(() => {
    if (!obstacles.upper && Math.random() < 0.5) {
      obstacles.upper = createObstacle(upperY)
    }

    if (!obstacles.lower && Math.random() < 0.5) {
      obstacles.lower = createObstacle(lowerY)
    }
  }, spawnInterval)
}
