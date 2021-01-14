import { atom } from "recoil";
import { getRandom } from "./helpers";

// Create random number of enemies
const createEnemies = (max) => {
 let enemyArray = [];
 for (let i = 0; i < max; i ++) {
  enemyArray = [{ x: getRandom(-15, 15), y: getRandom(-8, 8), z: getRandom(-10, -500) }, ...enemyArray];
 }
 return enemyArray;
}

export const gameState = atom({
 key: "game",
 default: false
})

export const shipPositionState = atom({
 key: "shipPosition", // unique ID (with respect to other atoms/selectors)
 default: { position: {}, rotation: {} }, // default value (aka initial value)
});

export const enemyPositionState = atom({
 key: "enemyPosition", // unique ID (with respect to other atoms/selectors)
 default: createEnemies(150), // default value (aka initial value)
});

export const enemyDestroyedState = atom({
 key: "enemyDestroyedPosition", // unique ID (with respect to other atoms/selectors)
 default: [], // default value (aka initial value)
})

export const laserPositionState = atom({
 key: "laserPositions", // unique ID (with respect to other atoms/selectors)
 default: [] // default value (aka initial value)
});

export const scoreState = atom({
 key: "score", // unique ID (with respect to other atoms/selectors)
 default: 0, // default value (aka initial value)
});

export const missedEnemiesState = atom({
 key: "missedEnemies",
 default: []
})

export const gameOverState = atom({
 key: "gameOver",
 default: false
})