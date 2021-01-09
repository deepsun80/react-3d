import { atom } from "recoil";
import { getRandom } from "./helpers";

// Create random number of enemies
const createEnemies = (max) => {
 let enemyArray = [];
 for (let i = 0; i < max; i ++) {
  enemyArray = [{ x: getRandom(-8, 8), y: getRandom(-4, 4), z: getRandom(-10, -200) }, ...enemyArray];
 }
 return enemyArray;
}

export const shipPositionState = atom({
 key: "shipPosition", // unique ID (with respect to other atoms/selectors)
 default: { position: {}, rotation: {} }, // default value (aka initial value)
});

export const enemyPositionState = atom({
 key: "enemyPosition", // unique ID (with respect to other atoms/selectors)
 default: createEnemies(20), // default value (aka initial value)
});

export const laserPositionState = atom({
 key: "laserPositions", // unique ID (with respect to other atoms/selectors)
 default: [] // default value (aka initial value)
});

export const scoreState = atom({
 key: "score", // unique ID (with respect to other atoms/selectors)
 default: 1, // default value (aka initial value)
});