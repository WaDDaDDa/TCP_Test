import { addUser } from "../../session/user.session.js";
import {
  HANDLER_IDS,
  RESPONSE_SUCCESS_CODE,
} from "../../constants/handlerIds.js";
import { createResponse } from "../../utils/response/createResponse.js";
import { handleError } from "../../utils/error/errorHandler.js";
import {
  createUser,
  findUserByDeviceID,
  updateUserLogin,
} from "../../db/user/user.db.js";

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;

    let user = await findUserByDeviceID(deviceId);

    if (!user) {
      user = await createUser(deviceId);
    } else {
      await updateUserLogin(user.id);
    }

    // 유저의 정보 socket, deviceId를 세션에 저장
    addUser(socket, user.id);

    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: user.id },
      deviceId
    );

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (err) {
    handleError(socket, err);
  }
};

export default initialHandler;
