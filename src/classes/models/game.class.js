const MAX_PLAYERS = 2;

class Game{
    constructor(id){
        this.id = id;
        this.users = [];
        this.state = "waiting"; // "waiting" "inProgress"
    }

    addUser(user){
        if(this.users.length >= MAX_PLAYERS)
        {
            throw new Error("Game seesion is full");
        }

        this.users.push(user);

        if(this.users.length === MAX_PLAYERS){
            serTimeOut(() => {
                this.startGame();
            }, 3000); // 3초뒤 게임 시작
        }
    }

    getUser(userId){
        return this.users.find((user) => user.id === userId);
    }

    removeUser(userId){
        this.users = this.users.filter((user) => user.id !== userId);

        if(this.users.length < MAX_PLAYERS){
            this.state = "waiting";
        }
    }

    startGame(){
        this.state = "inProgress";
    }
}

export default Game;