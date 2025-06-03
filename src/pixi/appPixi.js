import { Application } from 'pixi.js'
import { addStars } from './addStars'
import { addMoon } from './addMoon'
import { addBackgrounds } from './addBackgrounds'
import { addHero } from './addHero'
export const initPixiApp = async (elementIdInit) => {
  const app = new Application()
  const gravity = 0.1
  const speedGame = 3
  ;(async () => {
    await app.init({ background: '#021f4b', resizeTo: elementIdInit })

    elementIdInit.appendChild(app.canvas)
    await addMoon(app)
    await addStars(app)
    await addBackgrounds(app, speedGame)
    const hero = await addHero(app, gravity, speedGame)
    app.stage.addChild(hero)
    app.ticker.add(() => {
      hero.update()
    })
  })()
}
// Create a PixiJS application.
