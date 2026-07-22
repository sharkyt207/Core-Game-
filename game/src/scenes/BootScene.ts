import Phaser from "phaser";

/**
 * First scene. Sets up global rendering defaults (crisp pixels) and hands off
 * to the menu. Asset preloading will live here once we have sprite atlases.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  create(): void {
    // Pixel-art: never smooth textures.
    this.cameras.main.roundPixels = true;
    this.scene.start("Menu");
  }
}
