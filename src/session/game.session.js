import { gameSessions } from "./sessions.js";
import Game from "../classes/models/game.class.js";

export const addGameSession = (id) => {
  const seesion = new Game(id);
  gameSessions.push(seesion);
  return seesion;
};

export const removeGameSession = (id) => {
  const index = gameSessions.findIndex((session) => session.id === id);
  if (index !== -1) {
    return gameSessions.splice(index, 1)[0];
  }
};

export const getGameSession = (id) => {
  return gameSessions.find((session) => session.id === id);
};

export const getAllGameSession = () => {
  return gameSessions;
};
