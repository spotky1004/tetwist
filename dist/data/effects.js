import Effect from "../class/game/effect/Effect.js";
const gravity = new Effect({
    name: "Gravity",
    description: (tier) => `Move down piece's height by 1 every ${((0.8 - ((tier - 1) * 0.007)) ** (tier - 1) * 1000).toFixed(0)} ms.`
})
    .addScheduledAction((game) => {
    game.field;
}, (tier) => (0.8 - ((tier - 1) * 0.007)) ** (tier - 1))
    .freeze();
const bump = new Effect({
    name: "Bump",
    description: (tier) => `Spawn ${tier} garbage line(s) every ${Math.max(5, 10 - tier)} piece placed.`
})
    .addAction("piecePlace", () => {
}, (tier) => Math.max(5, 10 - tier))
    .freeze();
export default {
    gravity,
    bump
};
