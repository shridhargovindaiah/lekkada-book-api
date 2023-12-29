import { FastifyInstance } from 'fastify';
import {
    createExpense, 
    deleteExpense,
    getAllExpense, 
    getExpenseById, 
    updateExpense 
} from '../controller/expense.controller';
import fastifyAuth from '@fastify/auth';

const routes = async (fastify:FastifyInstance, options={}) => {
    fastify.register(fastifyAuth, { 
        prefix: "/api/v1/expense",    
    }).after(() => {
        privateUserRoutes(fastify);
    });
}

const privateUserRoutes = (fastify: any) => {
    fastify.addHook("preHandler", fastify.auth([fastify.verifyJWT]));
    
    fastify.get("/",  getAllExpense);
    fastify.get("/:id",  getExpenseById);
    fastify.post("/",  createExpense);
    fastify.put("/:id",  updateExpense);
    fastify.delete("/:id",  deleteExpense);
}

export default routes;