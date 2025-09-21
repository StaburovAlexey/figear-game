import { Application } from 'pixi.js'
import { addStars } from './addStars'
import { addMoon } from './addMoon'
import { addBackgrounds } from './addBackgrounds'
import { addHero } from './addHero'
import { addObstacles } from './addBlocksOfRoad.js'
import { count } from './addCountStart.js'
import { sound } from '@pixi/sound'
export const initPixiApp = async (elementIdInit, stateRefs = {}, chapter) => {
  const app = new Application()
  const element = elementIdInit
  await app.init({ background: '#021f4b', resizeTo: element })
  element.appendChild(app.canvas)
  // 👇 Проверяем, если это нужная глава
  if (chapter.title == 'Заезд') {
    let isGameOver = false
    let hero, obstacles, background
    let speedGame = 0
    let controlsAdded = false

    async function startGame() {
      stateRefs.gameOver.value = false
      stateRefs.lives.value = 3
      stateRefs.score.value = 0
      app.stage.removeChildren()
      app.stage.alpha = 1
      isGameOver = false

      const heroHeight = app.screen.height / 3
      const upperY = (app.screen.height - heroHeight) / 1.19
      const lowerY = (app.screen.height - heroHeight) / 1.02

      await addMoon(app)
      await addStars(app)

      background = await addBackgrounds(app)
      obstacles = await addObstacles(app, upperY, lowerY, heroHeight)
      hero = await addHero(heroHeight, upperY, lowerY)

      addMoveHero()
      app.stage.addChild(hero)
      app.ticker.start()
      await count(app)
      timer()
      app.ticker.add(gameLoop)
    }

    function gameLoop(time) {
      if (isGameOver) return
      if (speedGame < 5) {
        speedGame += 0.02
      }
      stateRefs.score.value += 0.01 * (speedGame / 1.2)
      hero.update(speedGame)
      obstacles.update(time.deltaTime * speedGame)
      background.update(time.deltaTime * speedGame)

      if (!hero.flashing && colisionCheck(hero, obstacles, app)) {
        console.log('💥 Столкновение')
        speedGame = 0
        stateRefs.lives.value -= 1

        if (stateRefs.lives.value <= 0) {
          gameOver()
          return
        }

        hero.invulnerable()
      }
    }

    function gameOver(finish = false) {
      if (isGameOver) return
      if (!finish) {
        sound.play('game_over')
      }
      app.ticker.stop()
      app.ticker.remove(gameLoop)
      setTimeout(() => {
        stateRefs.gameOver.value = finish ? 'Finish-game' : 'Game-over'
        isGameOver = true
      }, 1000)
    }

    function restartGame() {
      if (chapter.title === 'Заезд') {
        startGame()
      }
    }

    function moveHeroTapWindow(directions) {
      console.log('🚀 moveHeroTapWindow', directions)
      if (directions === 'ArrowUp' || directions === 'ArrowDown') {
        hero.move(directions)
      }

      if (directions === 'Jump') {
        hero.jump(speedGame)
      }
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
          hero.jump(speedGame)
        }
      })
    }

    function timer() {
      const timerShift = setInterval(() => {
        stateRefs.seconds.value--

        if (stateRefs.seconds.value % 0.5 === 0 && speedGame < 12) {
          speedGame += 0.3
        }

        if (chapter.mode == 1 && stateRefs.seconds.value === 0) {
          clearInterval(timerShift)
          gameOver(true)
        }
      }, 1000)
    }

    function colisionCheck(hero, obstacles, app) {
      if (hero.isJumping) return

      const heroBounds = hero.getBounds()
      const heroBottomY = heroBounds.y + heroBounds.height

      for (const block of obstacles.blocks) {
        if (block.collected) continue
        const blockBounds = block.getBounds()
        const blockBottomY = blockBounds.y + blockBounds.height

        const isBottomAligned = Math.abs(heroBottomY - blockBottomY) < 10
        const isXOverlap =
          heroBounds.x + heroBounds.width > blockBounds.x &&
          heroBounds.x < blockBounds.x + blockBounds.width

        if (isBottomAligned && isXOverlap && block.type === 'bonus') {
          block.collected = true
          app.stage.removeChild(block)
          stateRefs.bonus.value += 1
          if (stateRefs.bonus.value === 10) {
            stateRefs.bonus.value = 0
            stateRefs.lives.value++
          }
          return false
        }

        if (isBottomAligned && isXOverlap && block.type !== 'bonus') {
          return true
        }
      }
    }

    await startGame()

    return {
      moveHeroTapWindow,
    }
  } else {
    console.log(`🔔 Глава "${chapter.title}" пока не поддерживается`)
    return {}
  }
}
