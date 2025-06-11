import { Sprite, Assets } from 'pixi.js'

export function addTaxi(app, heroHeight, obstacleHeight, lineY, lowerY) {
  let taxi = new Sprite(Assets.get('taxi'))
  taxi.width = obstacleHeight * 5
  taxi.height = obstacleHeight * 3
  taxi.x = app.screen.width
  taxi.y = lineY + heroHeight - obstacleHeight * 3
  taxi.zIndex = lineY === lowerY ? 2 : 0
  taxi.type = 'taxi'
  app.stage.addChild(taxi)

  return taxi
}
