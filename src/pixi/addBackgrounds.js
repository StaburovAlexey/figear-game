import { createBackCity } from './addBackCity'
import { createWall } from './addWall'
import { createLayerHouses } from './addHouses'
import { createRoadLamps } from './addRoad'
export async function addBackgrounds(app, speed) {
  const speedGame = speed

  await createBackCity(app, speedGame)
  await createWall(app, speedGame)
  await createLayerHouses(app, speedGame)
  await createRoadLamps(app, speedGame)
}
