import { Assets, Sprite, Container } from 'pixi.js'
async function createHouse(app, nameAsset) {
  const texture = Assets.get(nameAsset)
  const sprite = new Sprite(texture)
  switch (nameAsset) {
    case 'house1':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.4
      sprite.y = app.screen.height / 10
      return sprite
    case 'house2':
      sprite.width = app.screen.width
      sprite.height = app.screen.height * 1.7
      sprite.y = -app.screen.height / 2.4
      return sprite
    case 'house3':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1
      sprite.y = -app.screen.height / 13
      return sprite
    case 'house4':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.1
      sprite.y = -app.screen.height / 100
      return sprite
    case 'house5':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.6
      sprite.y = app.screen.height / 10
      return sprite
    case 'house6':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.6
      sprite.y = app.screen.height / 9
      return sprite
    case 'house7':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.5
      sprite.y = app.screen.height / 25 + 17
      return sprite
    case 'karas':
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.2
      sprite.y = app.screen.height / 40
      return sprite
    default:
      sprite.width = app.screen.width / 2
      sprite.height = app.screen.height / 1.5
      sprite.y = app.screen.height / 10
      return sprite
  }
}
async function createHouseGroup(app, houseNames) {
  const group = new Container()
  let prevHouse = null

  for (let i = 0; i < houseNames.length; i++) {
    const houseSprite = await createHouse(app, houseNames[i])

    if (prevHouse === null) {
      houseSprite.x = 0
    } else {
      houseSprite.x = prevHouse.x + prevHouse.width
    }

    group.addChild(houseSprite)
    prevHouse = houseSprite
  }

  return group
}

export async function createLayerHouses(app, speedGame) {
  const houseNames = [
    'house1',
    'house2',
    'house3',
    'ozzy',
    'house4',
    'house5',
    'iggy',
    'house6',
    'house7',
    'karas',
  ]

  const group = await createHouseGroup(app, houseNames)
  const group2 = await createHouseGroup(app, houseNames)

  group.x = 0
  group.y = 0
  group2.x = group.width
  group2.y = 0

  app.stage.addChild(group, group2)
  function update(speed) {
    const dx = speed

    group.x -= dx
    group2.x -= dx

    if (group.x <= -group.width) {
      group.x = group2.x + group2.width
    }
    if (group2.x <= -group2.width) {
      group2.x = group.x + group.width
    }
  }
  return {
    update,
  }
}
