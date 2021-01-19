import { atom } from "recoil";
import { getRandom } from "./helpers";

// Create random number of enemies
const createEnemies = (max) => {
 let enemyArray = [];
 for (let i = 0; i < max; i ++) {
  enemyArray = [{ x: getRandom(-20, 20), y: getRandom(-10, 10), z: getRandom(-20, -500), yRotation: getRandom(0, 180) }, ...enemyArray];
 }
 return enemyArray;
}

export const gameState = atom({
 key: "game",
 default: false
})

export const shipPositionState = atom({
 key: "shipPosition",
 default: { position: {}, rotation: {} },
});

export const shipDestroyedState = atom({
 key: "shipDestroyed",
 default: [],
});

export const enemyPositionState = atom({
 key: "enemyPosition",
 default: createEnemies(80),
});

export const enemyDestroyedState = atom({
 key: "enemyDestroyedPosition",
 default: [],
})

export const laserPositionState = atom({
 key: "laserPositions",
 default: []
});

export const scoreState = atom({
 key: "score",
 default: 0,
});

export const missedEnemiesState = atom({
 key: "missedEnemies",
 default: []
});

export const gameOverState = atom({
 key: "gameOver",
 default: false
});