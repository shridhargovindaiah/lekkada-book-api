import User from "../models/user.model";

export const createUser = async (request: any, reply: any) => {
    try {
        const users = await User.create({
            data: request.body
        });
        reply.send({data: users});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const deleteUser = async (request: any, reply: any) => {
    try {
        reply.send("Not implemented yet");
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const getAllUsers = async (request: any, reply: any) => {
    try {
        const users = await User.findMany();
        reply.send({data: users});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const getUserById = async (request: any, reply: any) => {
    try {
        reply.send("Not implemented yet");
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const updateUser = async (request: any, reply: any) => {
    try {
        reply.send("Not implemented yet");
    } catch(err) {
        reply.status(500).send(err);
    }
};