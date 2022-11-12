import * as users from '../models/user.server.model';
import Logger from "../../config/logger";
import {Request, Response} from "express";

const list = async (req:Request, res:Response) : Promise<void> => {
    Logger.http(`GET all users`)
    try {
        const result = await users.getAll();
        res.status( 200 ).send( result );
    } catch( err ) {
        res.status( 500 )
            .send( `ERROR getting users ${ err }` );
    }
};

const create = async (req: Request, res: Response) : Promise<void> => {
    Logger.http(`POST create a user with username: ${req.body.username}`)
    if (! req.body.hasOwnProperty("username")){
        res.status(400).send("Please provide username field");
        return
    }
    const username = req.body.username;
    try {
        const result = await users.insert( username );
        res.status( 201 ).send({"user_id": result.insertId} );
    } catch( err ) {
        res.status( 500 ).send( `ERROR creating user ${username}: ${
            err }` );
    }
};

const read = async (req: Request, res: Response) : Promise<void> =>
{
    Logger.http(`GET single user id: ${req.params.id}`)
    const id = req.params.id;
    try {
        const result = await users.getOne( parseInt(id, 10) );
        if( result.length === 0 ){
            res.status( 404 ).send('User not found');
        } else {
            res.status( 200 ).send( result[0] );
        }
    } catch( err ) {
        res.status( 500 ).send( `ERROR reading user ${id}: ${ err }`
        );
    }
};
const update = async (req: Request, res: Response) : Promise<void> => {
    Logger.http(`PUT - update user id: ${req.params.id}`)
    const id = req.params.id;
    try {
        const user = await users.alter(parseInt(id, 10), req.body.username);

        if (user.length === 0) {
            res.status(404).send('User Not Found');
        } else if (req.body.username.length === 0) {
            res.status(400).send('No details provided to update')
        } else {
            res.status(200).send(user);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
};

const remove = async (req:Request, res:Response) : Promise<void> => {
    Logger.http(`DELETE - Delete the user with ID = ${req.params.id}`);
    const id = req.params.id;
    try{
        const result = await users.remove(parseInt(id, 10));
        res.status(200).send(`User with id ${id} is deleted`);
    } catch (err) {
        res.status(400).send("Bad request");
    }
    return null;
};
export { list, create, read, update, remove }