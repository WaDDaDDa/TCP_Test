import dotenv from 'dotenv';

// 중앙 집중식 관리 모든 환경변수를 여기에 선언

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || 'localhost';
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1.0.0';