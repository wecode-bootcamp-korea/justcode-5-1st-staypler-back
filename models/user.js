import prisma from './prisma-client.js';

export const createUser = async (email, username, encryptPw, phoneNumber) => {
  return await prisma.$queryRaw`
        INSERT INTO users(email,name,password,phone) VALUES (${email}, ${username}, ${encryptPw}, ${phoneNumber})`;
};

export const readUserByEmail = async email => {
  return await prisma.$queryRaw`
        SELECT users.email FROM users where email = ${email}`;
};

export const getUserPasswordbyId = async user_id => {
  return await prisma.$queryRaw`
        SELECT password FROM users WHERE id=${user_id}`;
};

export const getUserIdByEmail = async email => {
  return await prisma.$queryRaw`
        SELECT id FROM users WHERE email = ${email}`;
};

export const getUserIdbyId = async user_id => {
  return await prisma.$queryRaw`
        SELECT id FROM users WHERE id=${user_id}`;
};

export const passwordIsCorrect = async email => {
  return await prisma.$queryRaw`
        SELECT users.password FROM users WHERE email=${email}`;
};

export const updatePassword = async (user_id, password) => {
  return await prisma.$queryRaw`
    UPDATE users set password=${password} WHERE id=${user_id}
  `;
};

export async function readUserInfo(userId) {
  const userInfo = await prisma.$queryRaw`
  SELECT email, name FROM users WHERE id=${userId};
  `;

  return userInfo;
}
