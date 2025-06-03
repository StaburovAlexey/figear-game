import { Texture, Sprite, Assets } from 'pixi.js'
export async function addMoon(app) {
  await Assets.load({
    alias: 'moon',
    src: '/src/assets/background/sun.png',
  })
  const texture = Texture.from('moon')
  const sprite = new Sprite(texture)

  sprite.x = app.screen.width / 2 + 200
  sprite.y = app.screen.height / 40
  sprite.width = app.screen.width / 6
  sprite.height = app.screen.width / 6
  app.stage.addChild(sprite)
}
