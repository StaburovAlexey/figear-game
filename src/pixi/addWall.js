import { Assets, Sprite } from 'pixi.js'

export async function createWall(app, speedGame) {
  const options = {
    width: app.screen.width,
    height: app.screen.height / 1.5,
    x: 0,
    y: app.screen.height / 5,
    speed: speedGame,
  }
  const texture = Assets.get('wall_pixel_grey')
  const sprite = new Sprite(texture)
  const sprite2 = new Sprite(texture)
  sprite.width = options.width
  sprite.height = options.height
  sprite2.width = options.width
  sprite2.height = options.height
  sprite.x = options.x
  sprite.y = options.y
  sprite2.x = options.x + options.width
  sprite2.y = options.y
  app.stage.addChild(sprite, sprite2)
  app.ticker.add((time) => {
    const dx = time.deltaTime * options.speed
    sprite.x -= dx
    sprite2.x -= dx

    if (sprite.x <= -app.screen.width) {
      sprite.x += app.screen.width * 2
    }
    if (sprite2.x <= -app.screen.width) {
      sprite2.x += app.screen.width * 2
    }
  })
}
