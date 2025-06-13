import { Assets, Sprite } from 'pixi.js'
async function createHouse(app, nameAsset) {
  const texture = Assets.get(nameAsset)
  const sprite = new Sprite(texture)
  switch (nameAsset) {
    case 'alexabder_ryazanski':
      sprite.width = app.screen.width / 3
      sprite.height = app.screen.height / 2
      sprite.y = app.screen.height / 10
      return sprite
    case 'circus':
      sprite.width = app.screen.width / 1.5
      sprite.height = app.screen.height
      sprite.y = -app.screen.height / 5
      return sprite
    case 'esenin':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 2
      sprite.y = app.screen.height / 1.8 - sprite.height
      return sprite
    case 'kremlin':
      sprite.width = app.screen.width / 1
      sprite.height = app.screen.height / 1
      sprite.y = app.screen.height / 1.6 - sprite.height
      return sprite
    case 'kukolniy_teatr':
      sprite.width = app.screen.width / 1.5
      sprite.height = app.screen.height / 1.2
      sprite.y = app.screen.height / 1.4 - sprite.height
      return sprite
    case 'teatr_drammy':
      sprite.width = app.screen.width / 1
      sprite.height = app.screen.height / 1.3
      sprite.y = app.screen.height / 1.6 - sprite.height
      return sprite
    default:
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.5
      sprite.y = app.screen.height / 10
      return sprite
  }
}

export async function createLayerAtraction(app, container) {
  let attraction = null
  const houseNames = [
    'alexabder_ryazanski',
    'circus',
    'esenin',
    'kremlin',
    'kukolniy_teatr',
    'teatr_drammy',
  ]

  async function update(speed) {
    if (attraction) {
      attraction.x -= speed
      if (attraction.x + attraction.width < 0) {
        app.stage.removeChild(attraction)
        attraction = null
      }
    }
    if (!attraction) {
      // 2% шанс каждый кадр
      if (Math.random() < 0.01) {
        const randomAtraction = getRandomTexture(houseNames)
        attraction = await createHouse(app, randomAtraction.name)
        attraction.x = app.screen.width
        container.addChild(attraction)
      }
    }
  }

  return {
    update,
  }
}
function getRandomTexture(houseNames) {
  const name = houseNames[Math.floor(Math.random() * houseNames.length)]
  return { name, texture: Assets.get(name) }
}
