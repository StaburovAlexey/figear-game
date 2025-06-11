import { Container, Assets, Sprite } from 'pixi.js'

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min
}
function createTree(app, group, index, maxGroupWidth) {
  const randomNumberTree = randomNumber(1, 7)
  const texture = Assets.get(`tree${randomNumberTree}`)
  const sprite = new Sprite(texture)
  sprite.height = app.screen.height / 3
  sprite.width = app.screen.width / 8
  sprite.y = group.y + randomNumber(5, 10)
  sprite.x = 0 + index * (maxGroupWidth / 3.5)
  return sprite
}
function createTreeGroup(app, x) {
  const group = new Container()
  const sprites = []
  const groupMaxWidth = app.screen.width / 4
  group.x = x
  for (let i = 0; i <= 2; i++) {
    const sprite = createTree(app, group, i, groupMaxWidth)
    sprites.push(sprite)
  }
  group.addChild(...sprites)
  return group
}

export function createLayerTree(app) {
  const layerTree = new Container()
  const groupsTrees = []
  layerTree.x = 0
  layerTree.y = app.screen.height / 2.6
  app.stage.addChild(layerTree)
  function update(speed) {
    const dx = speed
    layerTree.x -= dx

    if (groupsTrees.length == 0) {
      const sprite = createTreeGroup(app, 0)
      groupsTrees.push(sprite)
      layerTree.addChild(sprite)
    } else {
      const firstItem = groupsTrees[0].getGlobalPosition()
      const lastItem = groupsTrees[groupsTrees.length - 1]
      if (firstItem.x < app.screen.x && groupsTrees.length == 7) {
        layerTree.removeChild(firstItem)
        groupsTrees.shift()
      }
      if (7 != groupsTrees.length) {
        const sprite = createTreeGroup(app, lastItem.x + lastItem.width)
        groupsTrees.push(sprite)
        layerTree.addChild(sprite)
      }
    }
  }
  return {
    update,
  }
}
