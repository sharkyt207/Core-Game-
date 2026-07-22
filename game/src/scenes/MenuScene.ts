import Phaser from "phaser";
import { PALETTE } from "../core/palette";

/**
 * Minimal, real menu that proves the render pipeline end-to-end:
 * neon title, a pulsing energy core, and a start prompt. This is the
 * production seed the full game (movement, mining, HUD) grows from.
 */
export class MenuScene extends Phaser.Scene {
  private core!: Phaser.GameObjects.Arc;
  private glow!: Phaser.GameObjects.Arc;

  constructor() {
    super("Menu");
  }

  create(): void {
    const { width, height } = this.scale;

    // deep-space backdrop
    this.add
      .rectangle(0, 0, width, height, PALETTE.space2)
      .setOrigin(0)
      .setDepth(-10);

    // starfield
    for (let i = 0; i < 40; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const s = Math.random() < 0.5 ? 1 : 2;
      this.add.rectangle(x, y, s, s, PALETTE.cyan, 0.6).setOrigin(0);
    }

    // pulsing core
    this.glow = this.add.circle(width / 2, height * 0.42, 52, PALETTE.teal, 0.18);
    this.core = this.add.circle(width / 2, height * 0.42, 26, PALETTE.cyan, 1);

    // title
    this.add
      .text(width / 2, height * 0.62, "COREBREAKER", {
        fontFamily: "monospace",
        fontSize: `${Math.round(width * 0.09)}px`,
        color: "#eaffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.62 + width * 0.09, "DEEP CORE MINING", {
        fontFamily: "monospace",
        fontSize: `${Math.round(width * 0.03)}px`,
        color: "#12d9b0",
      })
      .setOrigin(0.5)
      .setLetterSpacing(6);

    this.add
      .text(width / 2, height * 0.82, "TAP TO START", {
        fontFamily: "monospace",
        fontSize: `${Math.round(width * 0.04)}px`,
        color: "#ff8a3d",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      // Next: GameScene (movement + mining). Wired in the next milestone.
      this.cameras.main.flash(200, 45, 226, 230);
    });
  }

  update(time: number): void {
    const p = 0.5 + Math.sin(time / 240) * 0.5;
    this.core.setScale(0.85 + p * 0.25);
    this.glow.setScale(0.9 + p * 0.4);
    this.glow.setAlpha(0.1 + p * 0.15);
  }
}
