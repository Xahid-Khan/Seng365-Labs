import { getPool } from "../../config/db";
import Logger from "../../config/logger";
import {ResultSetHeader} from "mysql2";
import logger from "../../config/logger";

const getAll = async () : Promise<User[]> => {
    Logger.info(`Getting all users from the database`);
    const conn = await getPool().getConnection();
    const query = 'select * from lab2_users';
    const [ rows ] = await conn.query( query );
    conn.release();
    return rows;
};

const getOne = async (id: number) : Promise<User[]> => {
    Logger.info(`Getting user ${id} from the database`);
    const conn = await getPool().getConnection();
    const query = 'select * from lab2_users where user_id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return rows;
};

const insert = async (username: string) : Promise<ResultSetHeader> => {
    Logger.info(`Adding user ${username} to the database`);
    const conn = await getPool().getConnection();
    const query = 'insert into lab2_users (username) values ( ? )';
    const [ result ] = await conn.query( query, [ username ] );
    conn.release();
    return result;
};

const alter = async (id: number, newName: string) : Promise<any> => {
    Logger.info(`Alter User ${id} in the database`);

    const connection = await getPool().getConnection();
    const query = `update lab2_users set username = ? where user_id = ${id}`;
    const [ result ] = await  connection.query(query, newName);
    connection.release();
    return result;
};

const remove = async (id: number) : Promise<any> => {
    Logger.info(`Delete user where id = ${id}`);

    const connection = await getPool().getConnection();
    const query = `Delete from lab2_users Where user_id = ${id}`;
    const [result] = await  connection.query(query);
    return result;
};

export { getAll, getOne, insert, alter, remove }


