import BaseManager from "./base.manager.js";

class IntervalManager extends BaseManager {
  // Map 객체를 사용하여 중복 인터벌을 가지지 않도록 설정합니다.
  constructor() {
    super();
    this.intervals = new Map();
  }

  addPlayer(playerId, callback, interval, type = "user") {
    if (!this.intervals.has(playerId)) {
      this.intervals.set(playerId, new Map());
    }
    this.intervals.get(playerId).set(type, setInterval(callback, interval));
  }

  addGame(gameId, callback, interval) {
    this.addPlayer(gameId, callback, interval, "game");
  }

  addUpdatePosition(playerId, callback, interval) {
    this.addPlayer(playerId, callback, interval, "updatePosition");
  }

  removePlayer(playerId) {
    console.log("플레이어 제거 입장");

    if (this.intervals.has(playerId)) {
      console.log("플레이어 제거");
      const userIntervals = this.intervals.get(playerId);
      userIntervals.forEach((intervalId) => {
        clearInterval(intervalId);
      });
      this.intervals.delete(playerId);
    }
  }

  removeInterval(playerId, type) {
    if (this.intervals.has(playerId)) {
      const userIntervals = this.intervals.get(playerId);
      if (userIntervals.has(type)) {
        clearInterval(userIntervals.get(type));
        userIntervals.delete(type);
      }
    }
  }

  claerAll() {
    this.intervals.forEach((userIntervals) => {
      userIntervals.forEach((intervalId) => {
        clearInterval(intervalId);
      });

      this.intervals.clear();
    });
  }
}

export default IntervalManager;
