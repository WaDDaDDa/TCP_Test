import { userSessions } from './sessions.js';

//우선 지금 당장 필요한 것은 유저 추가, 삭제, 조회 정도 입니다. 유저 추가시에는 socket, uuid, sequence (호출 횟수)를 객체에 넣습니다.
export const addUser = (socket, uuid) => {
  const user = { socket, id: uuid, sequence: 0 };
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};

// 서버는 클라이언트의 요청이 끝날때마다 시퀀스의 값에 1을 더하여 보내줍니다.
// 클라이언트는 받은 시퀀스넘버를 다음 요청에서 사용하게됩니다.
// user.session.js 파일에 시퀀스 관련 함수를 추가해봅시다. 

export const getNextSequence = (id) => {
    const user = getUserById(id);
    if (user) {
      return ++user.sequence;
    }
    return null;
  };