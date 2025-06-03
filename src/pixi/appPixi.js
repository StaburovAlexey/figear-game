import { Application } from 'pixi.js'
import { addStars } from './addStars'
import { addMoon } from './addMoon'
import { addBackgrounds } from './addBackgrounds'
import { addHero } from './addHero'
import { addObstacles } from './addBlocksOfRoad.js'
export const initPixiApp = async (elementIdInit) => {
  const app = new Application()

  const speedGame = 6

  ;(async () => {
    await app.init({ background: '#021f4b', resizeTo: elementIdInit })
    const heroHeight = app.screen.height / 7
    const upperY = (app.screen.height - heroHeight) / 1.19
    const lowerY = (app.screen.height - heroHeight) / 1.07
    elementIdInit.appendChild(app.canvas)
    await addMoon(app)
    await addStars(app)
    await addBackgrounds(app, speedGame)
    await addObstacles(app, speedGame, upperY, lowerY, heroHeight)
    const hero = await addHero(app, speedGame)
    hero.zIndex = 2 // Устанавливаем zIndex для героя
    app.stage.addChild(hero)
    app.ticker.add(() => {
      hero.update()
    })
  })()
}
// Create a PixiJS application.
