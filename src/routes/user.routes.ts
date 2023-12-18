import {
    createUser, 
    deleteUser,
    getAllUsers, 
    getUserById, 
    updateUser 
} from '../controller/user.controller';

const routes = async (fastify:any, options={}) => {
    fastify.get("/", getAllUsers);
    fastify.get("/:id", getUserById);
    fastify.post("/", createUser);
    fastify.put("/:id", updateUser);
    fastify.delete("/:id", deleteUser);
}

export default routes;