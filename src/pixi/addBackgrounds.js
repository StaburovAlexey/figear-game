import { createBackCity } from './addBackCity'
import { createWall } from './addWall'
import { createLayerHouses } from './addHouses'
import { createRoadLamps } from './addRoad'
import { Container } from 'pixi.js'
import { createLayerAtraction } from './addAttractions'
export async function addBackgrounds(app, speed) {
  const speedGame = speed
  const attractionLayer = new Container()
  let attraction
  await createBackCity(app, speedGame)
  app.stage.addChild(attractionLayer)
  attraction = await createLayerAtraction(app, speedGame, attractionLayer)
  await createWall(app, speedGame)
  await createLayerHouses(app, speedGame)
  await createRoadLamps(app, speedGame)
  function update() {
    attraction.update()
  }
  return {
    update,
  }
}
