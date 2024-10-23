import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import protobuf from "protobufjs";
import { packetNames } from "../protobuf/packetNames.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// 최상위 경로
const protoDir = path.join(__dirname, "../protobuf");

// 파일 읽는 함수
// 비동기 병렬로 파일을 읽는다.
const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if(path.extname(file) === ".proto") {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

const protoMessages = {};

export const loadProtos =async () => {
    try{
        const root = new protobuf.Root();

        await Promise.all(protoFiles.map((file) => root.load(file)));

        // entries를 통해 key와 value를 다 가져온다. packetName에서 정의한 key common, response
        for(const [packageName, types] of Object.entries(packetNames)){
            protoMessages[packageName] = {};
            for(const [type, typeName] of Object.entries(types)){
                protoMessages[packageName][type] = root.lookupType(typeName);
            }
        }
        console.log(protoMessages);

        console.log("Protobuf 파일이 로드되었습니다.")
    } catch(err){
        console.error("Protobuf 파일 로드 중 오류가 발생했습니다.", err);
    }
}