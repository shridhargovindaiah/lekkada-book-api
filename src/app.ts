import Fastify from 'fastify';

import UserRoutes from "./routes/user.routes";

import dotenv from 'dotenv';
import { AddressInfo } from 'net';
dotenv.config();

const fastify = Fastify({
    logger: true
})
//import routes

//connect DB

//start the server
fastify.register(UserRoutes, { prefix: "/api/v1/users" });
const start = () => {
    try {
        fastify.listen(process.env.PORT || 3000, () => {
            const serverObject: any = fastify.server.address();
            console.log(`Server is running at ${serverObject.port}`);
        })
    } catch(err) {
        console.log("Failed:: ", err);
        process.exit(1);
    }
}

start();