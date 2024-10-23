import { config } from "../config/config.js";
import { PACKET_TYPE } from "../constants/header.js";
import { getHandlerById } from "../handlers/index.js";
import { packetParser } from "../utils/parser/packetParser.js";

// 데이터 스트림으로 서버와 클라이언트가 데이터를 주고 받음.
export const onData = (socket) => async (data) => {
  // 기존 버퍼에 새로 수신된 데이터를 추가
  // Buffer.concat은 여러개의 버퍼를 하나로 병합하는 역할을 합니다.
  // 소켓에 이미 수신된 데이터 socket.buffer와 새로 수신된 데이터 data를 Buffer.concat을 통해 하나의 버퍼로 합친후 socket.buffer에 저장합니다.
  socket.buffer = Buffer.concat([socket.buffer, data]);

  // 패킷의 총 헤더길이 (패킷 길이 정보 + 타입 정보)
  const totalHeaderLength =
    config.packet.totalLength + config.packet.typeLength;

  // 버퍼에 최소한 전체 헤더가 있을 때만 패킷을 처리한다.
  while (socket.buffer.length >= totalHeaderLength) {
    // 1. 패킷의 전체길이 정보 수신 (4바이트)
    const length = socket.buffer.readUInt32BE(0);
    // 2. 패킷 타입 정보 수신 (1바이트)  패킷의 헤더 길이 만큼 띄우고 8바이트 읽음.
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);
    // 3. 패킷 전체 길이 확인 후 데이터 수신
    if (socket.buffer.length >= length) {
      // 패킷 데이터를 자르고 버퍼에서 제거
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);

      console.log(`length(패킷 전체길이) : ${length}`);
      console.log(`packetType(패킷 타입): ${packetType}`);

      switch (packetType) {
        case PACKET_TYPE.PING:
          break;
        case PACKET_TYPE.NORMAL:
          const { handlerId, sequence, payload, userId } = packetParser(packet);
          
          const user = getUserById(userId);
          // 유저가 접속해 있는 상황에서 시퀀스 검증
          if (user && user.sequence !== sequence) {
            console.error('잘못된 호출 값입니다.');
          }

          const handler = getHandlerById(handlerId);
          await handler({
            socket,
            userId,
            payload,
          });
      }
    } else {
        // 아직 전체 패킷이 도착하지 않음.
        break;
    }
  }
};
