import { Texture, Sprite, Assets } from 'pixi.js';
export async function addMoon(app) {
  await Assets.load({
    alias: 'moon',
    src: '/src/assets/background/moon.png',
  });
  const texture = Texture.from('moon');
  const sprite = new Sprite(texture);
  // Установка позиции
  sprite.x = app.screen.width / 2 + 100;
  sprite.y = app.screen.height / 10;
  sprite.width = app.screen.width / 4;
  sprite.height = app.screen.width / 4;
  app.stage.addChild(sprite);
}
