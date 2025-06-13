import { createBackCity } from './addBackCity'
import { createWall } from './addWall'
import { createLayerHouses } from './addHouses'
import { createRoadLamps } from './addRoad'
import { createLayerTree } from './addTree.js'
import { Container } from 'pixi.js'
import { createLayerAtraction } from './addAttractions'
export async function addBackgrounds(app) {
  const attractionLayer = new Container()
  let attraction, backCity, wall, layerHouses, roadLamps, trees
  backCity = await createBackCity(app)
  app.stage.addChild(attractionLayer)
  attraction = await createLayerAtraction(app, attractionLayer)
  wall = await createWall(app)
  layerHouses = await createLayerHouses(app)
  trees = createLayerTree(app)
  roadLamps = await createRoadLamps(app)
  function update(deltaTime) {
    const dx = deltaTime
    roadLamps.update(dx)
    layerHouses.update(dx / 4)
    trees.update(dx / 4)
    wall.update(dx / 4)
    attraction.update(dx / 12)
    backCity.update(dx / 20)
  }
  return {
    update,
  }
}
