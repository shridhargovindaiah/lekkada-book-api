import {
    createUser, 
    deleteUser,
    getAllUsers, 
    getUserById, 
    updateUser 
} from '../controller/user.controller';
import fastifyAuth from '@fastify/auth';

const routes = async (fastify:any, options={}) => {
    fastify.register(fastifyAuth, { 
        prefix: "/api/v1/users",    
    }).after(() => {
        privateUserRoutes(fastify);
    });
}

const privateUserRoutes = (fastify: any) => {
    fastify.get("/", {
        preHandler: fastify.auth([fastify.verifyJWT])
    }, getAllUsers);
    fastify.get("/:id", getUserById);
    fastify.post("/", createUser);
    fastify.put("/:id", updateUser);
    fastify.delete("/:id", deleteUser);
}

export default routes;