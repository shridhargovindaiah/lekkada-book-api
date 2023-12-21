import Fastify from 'fastify';
import UserRoutes from "./routes/user.routes";
import { auth, signin, signup } from './modules/auth';
import dotenv from 'dotenv';
dotenv.config();

const fastify = Fastify({
    logger: true
});

fastify.decorate("verifyJWT", auth);

fastify.post("/signin", signin);
fastify.post("/signup", signup);

// import routes
fastify.register(UserRoutes, { 
    prefix: "/api/v1/users",    
 });

//start the server
const start = () => {
    try {
        fastify.listen({
            port: 5000
        }, (err, address) => {
            if(err) {
                console.log("Somethig went wrong ", err);
            }
            console.log("Server is running on ", address);
        })
    } catch(err) {
        console.log("Failed:: ", err);
        process.exit(1);
    }
}

start();