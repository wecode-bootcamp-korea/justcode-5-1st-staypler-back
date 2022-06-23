import prisma from './prisma-client.js';
import prismaClient from './prisma-client.js';

   export const createUser = async (email, username, encryptPw, phoneNumber ) => {
        console.log('createUser')
        return await prisma.$qeryRaw`
        INSERT INTO users(email,name,password,phone) VALUES (${email}, ${username}, ${encryptPw}, ${phoneNumber})`;
    };


    export const readUserByEmail = async (email) => {
        return await prisma.$qeryRaw`
        SELECT users.email FROM users where email = ${email}`;
        return user;
    };
    
    export const getUserIdByEmail = async (user_id) => {
        return await prisma.$queryRaw`
        SELECT id FROM users WHERE id = ${user_id}`;
    };

    export const getUserIdbyId = async (user_id) => {
        return await prisma.$qeryRaw`
        SELECT id FROM users WHERE id=${user_id}`;
    };


    export const passwordIsCorrect = async (email) => {
        return await prisma.$qeryRaw`
        SELECT users.password FROM users WHERE email=${email}`;
    };
    
