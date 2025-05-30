import { Application } from 'pixi.js';
import { addStars } from './addStars';
import { addMoon } from './addMoon';
export const initPixiApp = async (elementIdInit) => {
  const app = new Application();

  // Asynchronous IIFE
  (async () => {
    // Intialize the application.
    await app.init({ background: '#021f4b', resizeTo: elementIdInit });

    // Then adding the application's canvas to the DOM body.
    elementIdInit.appendChild(app.canvas);
    addMoon(app);
    addStars(app);
    
  })();
};
// Create a PixiJS application.
