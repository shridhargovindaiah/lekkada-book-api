import { FastifyInstance } from 'fastify';
import {
    createUser, 
    deleteUser,
    getAllUsers, 
    getUserById, 
    updateUser 
} from '../controller/user.controller';
import fastifyAuth from '@fastify/auth';

const routes = async (fastify:FastifyInstance, options={}) => {
    fastify.register(fastifyAuth, { 
        prefix: "/api/v1/users",    
    }).after(() => {
        privateUserRoutes(fastify);
    });
}

const privateUserRoutes = (fastify: any) => {
    fastify.addHook("preHandler", fastify.auth([fastify.verifyJWT]));
    fastify.get("/",  getAllUsers);
    fastify.get("/:id",  getUserById);
    fastify.post("/",  createUser);
    fastify.put("/:id",  updateUser);
    fastify.delete("/:id",  deleteUser);
}

export default routes;