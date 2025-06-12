import { Text } from 'pixi.js'

export async function count(app) {
  const countdownText = new Text('', {
    fill: 'white',
    fontSize: 100,
    align: 'center',
    fontFamily: 'pixel',
  })
  countdownText.anchor.set(0.5)
  countdownText.x = app.screen.width / 2
  countdownText.y = app.screen.height / 2
  app.stage.addChild(countdownText)
  const countdown = async () => {
    for (let i = 3; i > 0; i--) {
      countdownText.text = `${i}`
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    countdownText.text = 'Старт!'
    await new Promise((resolve) => setTimeout(resolve, 500))
    app.stage.removeChild(countdownText)
  }
  await countdown()
}
