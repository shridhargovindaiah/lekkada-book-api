import { FastifyInstance } from 'fastify';
import {
    createCategory, 
    deleteCategory,
    getCategories 
} from '../controller/category.controller';
import fastifyAuth from '@fastify/auth';

const routes = async (fastify:FastifyInstance, options={}) => {
    fastify.register(fastifyAuth, { 
        prefix: "/api/v1/category",    
    }).after(() => {
        privateUserRoutes(fastify);
    });
}

const privateUserRoutes = (fastify: any) => {
    fastify.addHook("preHandler", fastify.auth([fastify.verifyJWT]));
    fastify.get("/",  getCategories);
    fastify.post("/",  createCategory);
    fastify.delete("/:id",  deleteCategory);
}

export default routes;