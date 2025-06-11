import { Assets } from 'pixi.js'

import bar from '../assets/background/bar.png'
import block from '../assets/background/block.png'
import conus from '../assets/background/conus.png'
import conus2 from '../assets/background/conus2.png'
import dirt from '../assets/background/dirt.png'
import hero from '../assets/background/hero.png'
import house1 from '../assets/houses/house1.png'
import house2 from '../assets/houses/house2.png'
import house3 from '../assets/houses/house3.png'
import house4 from '../assets/houses/house4.png'
import house5 from '../assets/houses/house5.png'
import house6 from '../assets/houses/house6.png'
import house7 from '../assets/houses/house7.png'
import house8 from '../assets/houses/house8.png'
import house9 from '../assets/houses/house9.png'
import house10 from '../assets/houses/house10.png'
import house11 from '../assets/houses/house11.png'
import houses3 from '../assets/background/houses3.png'
import iggy from '../assets/background/iggy.png'
import karas from '../assets/background/karas.png'
import moon from '../assets/background/moon.png'
import ozzy from '../assets/background/ozzy.png'
import roadLamp from '../assets/background/road_lamp-pix.png'
import roadLamps from '../assets/background/road_lamps.png'
import sun from '../assets/background/sun.png'
import wallPixelGrey from '../assets/background/wall_pixel_grey.png'
import wallPixel from '../assets/background/wall-pixel.png'
import wall2 from '../assets/background/wall2.png'
//такси
import taxi from '../assets/taxi/taxi.png'
import warning from '../assets/taxi/beep.png'
//деревья
import tree1 from '../assets/trees/tree1.png'
import tree2 from '../assets/trees/tree2.png'
import tree3 from '../assets/trees/tree3.png'
import tree4 from '../assets/trees/tree4.png'
import tree5 from '../assets/trees/tree5.png'
import tree6 from '../assets/trees/tree6.png'
import tree7 from '../assets/trees/tree7.png'
//Достопремечательности
import alexabder_ryazanski from '../assets/background/attractions/alexabder_ryazanski.png'
import circus from '../assets/background/attractions/circus.png'
import esenin from '../assets/background/attractions/esenin.png'
import kremlin from '../assets/background/attractions/kremlin.png'
import kukolniy_teatr from '../assets/background/attractions/kukolniy_teatr.png'
import teatr_drammy from '../assets/background/attractions/teatr_drammy.png'
// Герой — движение
import go1 from '../assets/hero/go_1.png'
import go2 from '../assets/hero/go_2.png'
import go3 from '../assets/hero/go_3.png'
import go4 from '../assets/hero/go_4.png'
import go5 from '../assets/hero/go_5.png'
import go6 from '../assets/hero/go_6.png'

// Герой — прыжок
import jump1 from '../assets/hero/jump_1.png'
import jump2 from '../assets/hero/jump_2.png'
import jump3 from '../assets/hero/jump_3.png'
import jump4 from '../assets/hero/jump_4.png'
import jump5 from '../assets/hero/jump_5.png'
import jump6 from '../assets/hero/jump_6.png'
import jump7 from '../assets/hero/jump_7.png'
import jump8 from '../assets/hero/jump_8.png'
import jump9 from '../assets/hero/jump_9.png'
export async function preloadAssets() {
  await Assets.load([
    { alias: 'bar', src: bar },
    { alias: 'block', src: block },
    { alias: 'conus', src: conus },
    { alias: 'conus2', src: conus2 },
    { alias: 'dirt', src: dirt },
    { alias: 'hero', src: hero },
    { alias: 'house1', src: house1 },
    { alias: 'house2', src: house2 },
    { alias: 'house3', src: house3 },
    { alias: 'house4', src: house4 },
    { alias: 'house5', src: house5 },
    { alias: 'house6', src: house6 },
    { alias: 'house7', src: house7 },
    { alias: 'house8', src: house8 },
    { alias: 'house9', src: house9 },
    { alias: 'house10', src: house10 },
    { alias: 'house11', src: house11 },
    { alias: 'houses3', src: houses3 },
    { alias: 'iggy', src: iggy },
    { alias: 'karas', src: karas },
    { alias: 'moon', src: moon },
    { alias: 'ozzy', src: ozzy },
    { alias: 'road', src: roadLamp }, // основной road_lamp-pix
    { alias: 'road_lamps', src: roadLamps },
    { alias: 'sun', src: sun },
    { alias: 'wall_pixel_grey', src: wallPixelGrey },
    { alias: 'wall_pixel', src: wallPixel },
    { alias: 'wall2', src: wall2 },
    //такси
    { alias: 'taxi', src: taxi },
    { alias: 'warning', src: warning },
    //деревья
    { alias: 'tree1', src: tree1 },
    { alias: 'tree2', src: tree2 },
    { alias: 'tree3', src: tree3 },
    { alias: 'tree4', src: tree4 },
    { alias: 'tree5', src: tree5 },
    { alias: 'tree6', src: tree6 },
    { alias: 'tree7', src: tree7 },
    //Достопремечательности
    { alias: 'alexabder_ryazanski', src: alexabder_ryazanski },
    { alias: 'circus', src: circus },
    { alias: 'esenin', src: esenin },
    { alias: 'kremlin', src: kremlin },
    { alias: 'kukolniy_teatr', src: kukolniy_teatr },
    { alias: 'teatr_drammy', src: teatr_drammy },

    // Герой — движение
    { alias: 'go_1', src: go1 },
    { alias: 'go_2', src: go2 },
    { alias: 'go_3', src: go3 },
    { alias: 'go_4', src: go4 },
    { alias: 'go_5', src: go5 },
    { alias: 'go_6', src: go6 },

    // Герой — прыжок
    { alias: 'jump_1', src: jump1 },
    { alias: 'jump_2', src: jump2 },
    { alias: 'jump_3', src: jump3 },
    { alias: 'jump_4', src: jump4 },
    { alias: 'jump_5', src: jump5 },
    { alias: 'jump_6', src: jump6 },
    { alias: 'jump_7', src: jump7 },
    { alias: 'jump_8', src: jump8 },
    { alias: 'jump_9', src: jump9 },
  ])
}
