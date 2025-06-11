import { Assets, Sprite } from 'pixi.js'

export async function createBackCity(app) {
  const options = {
    width: app.screen.width,
    height: app.screen.height,
    x: 0,
    y: 0,
  }
  const texture = Assets.get('houses3')
  const sprite = new Sprite(texture)
  const sprite2 = new Sprite(texture)
  sprite.width = options.width
  sprite.height = options.height
  sprite2.width = options.width
  sprite2.height = options.height
  sprite.x = options.x
  sprite.y = options.y
  sprite2.x = options.x + app.screen.width
  sprite2.y = options.y
  app.stage.addChild(sprite, sprite2)
  function update(speed) {
    const dx = speed

    // Move the mountain groups leftwards.
    sprite.x -= dx
    sprite2.x -= dx

    // Reposition the mountain groups when they move off screen.
    if (sprite.x <= -app.screen.width) {
      sprite.x += options.width * 2
    }
    if (sprite2.x <= -app.screen.width) {
      sprite2.x += options.width * 2
    }
  }
  return {
    update,
  }
}
