
// 이후 서버에 적용할 수 있는 각종 매니저들의 부모클래스입니다.
// 지금은 해당 클래스를 이용해 인터벌 매니저를 만들겠습니다.

class BaseManager{
    constructor(){
        if(new.target === BaseManager){
            throw new TypeError("Cannot construct BaseManager instances directly");
        }
    }

    addPlayer(playerId, ...args){
        throw new Error("Must implement addPlayer method");
    }

    removePlayer(playerId){
        throw new Error("Must implement removePlayer method");
    }

    claerAll(){
        throw new Error("Must implement clearAll method");
    }
}

export default BaseManager;