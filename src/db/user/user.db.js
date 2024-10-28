import { v4 as uuidv4 } from "uuid";
import pools from "../database.js";
import { SQL_QURIES } from "./user.queries.js";
import { toCamelCase } from "../../utils/transformCase.js";

export const findUserByDeviceID = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QURIES.FIND_USER_BY_DEVICE_ID, [
    deviceId,
  ]);
  return toCamelCase(rows[0]);
};

export const createUser = async (deviceId) => {
  const id = uuidv4();
  await pools.USER_DB.query(SQL_QURIES.CREATE_USER, [id, deviceId]);
  return { id, deviceId };
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QURIES.UPDATE_USER_LOGIN, [id]);
};
