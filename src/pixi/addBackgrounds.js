import { Assets, Sprite, Container } from 'pixi.js'

export async function addBackgrounds(app, speed) {
  const speedGame = speed
  const optionsRoadLamps = {
    width: app.screen.width,
    height: app.screen.height,
    x: 0,
    y: 0,
    speed: speedGame * 2,
  }
  const optionsHouses = {
    width: app.screen.width,
    height: app.screen.height,
    x: 0,
    y: 0,
    speed: speedGame / 2,
  }
  const optionsObjectsWall = {
    width: app.screen.width,
    height: app.screen.height / 1.5,
    x: 0,
    y: app.screen.height / 5,
    speed: speedGame,
  }

  await createHouses(app, optionsHouses)
  await creatWall(app, optionsObjectsWall)
  await createLayerHouses(app, speedGame)

  await createRoadLamps(app, optionsRoadLamps)
}
async function createRoadLamps(app, options = {}) {
  const texture = Assets.get('road_lamps')
  console.log(texture)
  const sprite = new Sprite(texture)
  const sprite2 = new Sprite(texture)
  sprite.x = options.x
  sprite.y = options.y
  sprite2.x = options.x + options.width
  sprite2.y = options.y
  sprite.width = options.width
  sprite.height = options.height
  sprite2.width = options.width
  sprite2.height = options.height
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

async function createHouses(app, options = {}) {
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
  app.ticker.add((time) => {
    // Calculate the amount of distance to move the mountain groups per tick.
    const dx = time.deltaTime * options.speed

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
  })
}
async function creatWall(app, options = {}) {
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

async function createLayerHouses(app, speedGame) {
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

  app.ticker.add((time) => {
    const dx = time.deltaTime * speedGame

    group.x -= dx
    group2.x -= dx

    if (group.x <= -group.width) {
      group.x = group2.x + group2.width
    }
    if (group2.x <= -group2.width) {
      group2.x = group.x + group.width
    }
  })

  app.stage.addChild(group, group2)
}
