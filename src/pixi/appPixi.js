import { Application, Text } from 'pixi.js'
import { addStars } from './addStars'
import { addMoon } from './addMoon'
import { addBackgrounds } from './addBackgrounds'
import { addHero } from './addHero'
import { addObstacles } from './addBlocksOfRoad.js'
import { count } from './addCountStart.js'
export const initPixiApp = async (elementIdInit, stateRefs = {}) => {
  const app = new Application()
  const element = elementIdInit
  let isGameOver = false
  let gameOverText = null
  let hero, obstacles, background
  const speedGame = 10
  let controlsAdded = false
  await app.init({ background: '#021f4b', resizeTo: element })
  element.appendChild(app.canvas)

  async function startGame() {
    stateRefs.gameOver.value = false
    stateRefs.lives.value = 3
    stateRefs.score.value = 0
    app.stage.removeChildren()
    app.stage.alpha = 1
    isGameOver = false
    gameOverText = null

    const heroHeight = app.screen.height / 3
    const upperY = (app.screen.height - heroHeight) / 1.19
    const lowerY = (app.screen.height - heroHeight) / 1.02

    await addMoon(app)
    await addStars(app)

    background = await addBackgrounds(app, speedGame)
    obstacles = await addObstacles(app, upperY, lowerY, heroHeight)
    hero = await addHero(app, speedGame, heroHeight, upperY, lowerY)

    addMoveHero(hero)
    app.stage.addChild(hero)
    app.ticker.start()
    await count(app)
    app.ticker.add(gameLoop)
  }

  function gameLoop(time) {
    if (isGameOver) return
    stateRefs.score.value += 0.05 * (speedGame / 1.2)
    hero.update()
    obstacles.update(time.deltaTime * speedGame)
    background.update(time.deltaTime)
    if (!hero.flashing && colisionCheck(hero, obstacles)) {
      console.log('💥 Столкновение')
      stateRefs.lives.value = stateRefs.lives.value - 1

      if (stateRefs.lives.value <= 0) {
        gameOver()
        return
      }
      hero.invulnerable()
    }
  }

  function gameOver() {
    if (isGameOver) return

    app.ticker.stop()
    app.ticker.remove(gameLoop)
    setTimeout(() => {
      stateRefs.gameOver.value = true
      isGameOver = true
    }, 1000)
  }

  function restartGame() {
    startGame()
  }
  function addMoveHero() {
    if (controlsAdded) return
    controlsAdded = true

    document.addEventListener('keydown', (event) => {
      const key = event.key

      if (isGameOver && key === 'Enter') {
        restartGame()
      }

      if (key === 'ArrowUp' || key === 'ArrowDown') {
        hero.move(key)
      }

      if (key === ' ' || key === 'Space') {
        hero.jump()
      }
    })
  }
  addHero()
  await startGame()
}

function colisionCheck(hero, obstacles) {
  if (hero.isJumping) return

  const heroBounds = hero.getBounds()
  const heroBottomY = heroBounds.y + heroBounds.height

  for (const block of obstacles.blocks) {
    const blockBounds = block.getBounds()
    const blockBottomY = blockBounds.y + blockBounds.height

    const isBottomAligned = Math.abs(heroBottomY - blockBottomY) < 10

    const isXOverlap =
      heroBounds.x + heroBounds.width > blockBounds.x &&
      heroBounds.x < blockBounds.x + blockBounds.width

    if (isBottomAligned && isXOverlap) {
      return true
    }
  }
}
