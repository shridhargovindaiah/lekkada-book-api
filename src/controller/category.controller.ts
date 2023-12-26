
import Category from "../models/category.model";

export const createCategory = async (request: any, reply: any) => {
    try {
        const category = await Category.create({
            data: {
                name: request.body.name,
                description: request.body.description
            }
        });
        reply.send({data: category});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const deleteCategory = async (request: any, reply: any) => {
    try {
        const deleted = await Category.delete({
            where: {
                id: request.params.id
            }
        })
        reply.send({data: deleted});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const getCategories = async (request: any, reply: any) => {
    try {
        const categories = await Category.findMany();
        reply.send({data: categories});
    } catch(err) {
        reply.status(500).send(err);
    }
};
