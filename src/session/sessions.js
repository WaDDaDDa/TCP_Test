
//**sessions.js** 파일에는 유저세션을 추가할 배열을 선언합니다. 이후에 게임 기능을 추가하면 사용할 게임 세션도 미리 선언해두겠습니다. 

//이 부분은 이후 redis 를 적용하여 사용해도 좋을 것 같습니다.
export const userSessions = [];
export const gameSessions = [];