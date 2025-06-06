import { Application, Text } from 'pixi.js'
import { addStars } from './addStars'
import { addMoon } from './addMoon'
import { addBackgrounds } from './addBackgrounds'
import { addHero } from './addHero'
import { addObstacles } from './addBlocksOfRoad.js'

export const initPixiApp = async (elementIdInit) => {
  const app = new Application()
  const element = elementIdInit

  let isGameOver = false
  let gameOverText = null
  let hero, obstacles
  const speedGame = 2.8

  await app.init({ background: '#021f4b', resizeTo: element })
  element.appendChild(app.canvas)

  // Обработчик перезапуска
  document.addEventListener('keydown', (e) => {
    if (isGameOver && (e.key === ' ' || e.key === 'Spacebar')) {
      restartGame()
    }
  })

  async function startGame() {
    app.stage.removeChildren()
    app.stage.alpha = 1
    isGameOver = false
    gameOverText = null

    const heroHeight = app.screen.height / 7
    const upperY = (app.screen.height - heroHeight) / 1.19
    const lowerY = (app.screen.height - heroHeight) / 1.07

    await addMoon(app)
    await addStars(app)
    await addBackgrounds(app, speedGame)

    obstacles = await addObstacles(app, speedGame, upperY, lowerY, heroHeight)
    hero = await addHero(app, speedGame)

    app.stage.addChild(hero)

    app.ticker.start()
    app.ticker.add(gameLoop)
  }

  function gameLoop() {
    if (isGameOver) return

    hero.update()
    obstacles.update()
    if (colisionCheck(hero, obstacles)) {
      console.log('💥 Столкновение')
      gameOver()
    }
  }

  function gameOver() {
    if (isGameOver) return
    isGameOver = true
    app.ticker.stop()
    app.stage.alpha = 0.5

    gameOverText = new Text('GAME OVER\nPress Space to Restart', {
      fill: 'white',
      fontSize: 40,
      align: 'center',
    })
    gameOverText.anchor.set(0.5)
    gameOverText.x = app.screen.width / 2
    gameOverText.y = app.screen.height / 2
    app.stage.addChild(gameOverText)
  }

  function restartGame() {
    app.ticker.stop()
    startGame()
  }

  await startGame()
}

// Create a PixiJS application.
function colisionCheck(hero, obstacles) {
  if (hero.isJumping) return // в прыжке не проверяем столкновение

  const heroBounds = hero.getBounds()
  const heroBottomY = heroBounds.y + heroBounds.height

  for (const block of obstacles.blocks) {
    const blockBounds = block.getBounds()
    const blockBottomY = blockBounds.y + blockBounds.height

    // Условие: нижние точки примерно совпадают по Y
    const isBottomAligned = Math.abs(heroBottomY - blockBottomY) < 10

    // Условие: пересечение по оси X
    const isXOverlap =
      heroBounds.x + heroBounds.width > blockBounds.x &&
      heroBounds.x < blockBounds.x + blockBounds.width

    if (isBottomAligned && isXOverlap) {
      return true // Столкновение обнаружено
    }
  }
}
