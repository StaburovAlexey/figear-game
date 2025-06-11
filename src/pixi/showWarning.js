import { Sprite, Assets } from 'pixi.js'

export function showWarning(app) {
  let show = false
  let flashingInterval
  const texture = Assets.get('warning') // ← Убедись, что ассет 'warning' загружен
  const warningSprite = new Sprite(texture)
  warningSprite.height = app.screen.height / 5
  warningSprite.width = app.screen.width / 8
  warningSprite.x = app.screen.width - warningSprite.width

  warningSprite.rotation = -Math.PI / 9

  function addWarning(lineY) {
    if (show) return
    warningSprite.y = lineY + warningSprite.height
    warningSprite.alpha = 1
    flashingInterval = setInterval(() => {
      warningSprite.alpha = warningSprite.alpha === 1 ? 0.3 : 1
    }, 150)
    app.stage.addChild(warningSprite)
    show = true
  }
  function delWarning() {
    app.stage.removeChild(warningSprite)
    clearInterval(flashingInterval)
    show = false
  }
  return {
    delWarning,
    addWarning,
  }
}
