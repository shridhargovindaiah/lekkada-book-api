
import Expense from "../models/expense.model";

export const createExpense = async (request: any, reply: any) => {
    try {
        const { 
            name, 
            description, 
            amountSpend, 
            targetAmount, 
            category, 
            comment 
        } = request.body;
        const expense = await Expense.create({
            data: {
                name,
                description,
                amountSpend,
                targetAmount,
                categories: {
                    create: [
                        { name: category }
                    ]
                },
                comments: {
                    create: [
                        {title: `${request.user.id}_${name}`, content: comment}
                    ]
                },
                ownerId: request.user.id
            }
        });
        reply.send({data: expense});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const deleteExpense = async (request: any, reply: any) => {
    try {
        const expense = await Expense.delete({
            where: {
                id: request.params.id
            }
        })
        reply.send({data: expense});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const getAllExpense = async (request: any, reply: any) => {
    try {
        const expense = await Expense.findMany({
            include: {
                categories: true,
                comments: true
            }
        });
        reply.send({data: expense});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const getExpenseById = async (request: any, reply: any) => {
    try {
        const expense = await Expense.findUnique({
            where: {
                id: request.params.id
            },
            include: {
                categories: true,
                comments: true
            }
        });
        reply.send({data: expense});
    } catch(err) {
        reply.status(500).send(err);
    }
};
export const updateExpense = async (request: any, reply: any) => {
    try {
        const expense = await Expense.findUnique({
            where: {
                id: request.params.id
            }
        });
        if(expense) {
            const { 
                name, 
                description, 
                amountSpend, 
                targetAmount, 
                category 
            } = request.body;
            const updated = await Expense.update({
                where: {
                    id: expense?.id
                },
                data: {
                    name, 
                    description, 
                    amountSpend, 
                    targetAmount, 
                    categories: {
                        create: [
                            {name: category}
                        ]
                    } 
                }
            })
            reply.send({data: updated})
        } else {
            reply.status(404).send({data: null, error: "Invalid Expense Id"});
        }
        
    } catch(err) {
        reply.status(500).send(err);
    }
};