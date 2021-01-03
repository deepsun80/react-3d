import { atom } from "recoil";

export const shipPositionState = atom({
 key: "shipPosition", // unique ID (with respect to other atoms/selectors)
 default: { position: {}, rotation: {} }, // default value (aka initial value)
});

export const enemyPositionState = atom({
 key: "enemyPosition", // unique ID (with respect to other atoms/selectors)
 default: [{ x: 0, y: 0, z: -16 }], // default value (aka initial value)
});

export const laserPositionState = atom({
 key: "laserPositions", // unique ID (with respect to other atoms/selectors)
 default: [] // default value (aka initial value)
});

export const scoreState = atom({
 key: "score", // unique ID (with respect to other atoms/selectors)
 default: 0, // default value (aka initial value)
});