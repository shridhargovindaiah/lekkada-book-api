
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
        const user = await User.delete({
            where: {
                id: request.params.id
            }
        })
        reply.send({data: user});
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
        const user = await User.findUnique({
            where: {
                id: request.params.id
            }
        });
        reply.send({data: user});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const updateUser = async (request: any, reply: any) => {
    try {
        const user = await User.findUnique({
            where: {
                id: request.params.id
            }
        });
        if(user) {
            const updated = await User.update({
                where: {
                    id: user?.id
                },
                data: {
                    password: request.body.password
                }
            })
            reply.send({data: updated})
        } else {
            reply.status(404).send({data: null, error: "Invalid User Id"});
        }
        
    } catch(err) {
        reply.status(500).send(err);
    }
};