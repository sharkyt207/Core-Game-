import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { MenuScene } from "./scenes/MenuScene";
import { PALETTE } from "./core/palette";

/**
 * Game bootstrap. Portrait-first, FIT scaling so the game fills any phone
 * while keeping a consistent design resolution. WebGL with Canvas fallback.
 */
const DESIGN_WIDTH = 450;
const DESIGN_HEIGHT = 900;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  backgroundColor: PALETTE.space2,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  },
  render: {
    pixelArt: true,
    antialias: false,
  },
  scene: [BootScene, MenuScene],
};

new Phaser.Game(config);
