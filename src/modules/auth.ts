import User from '../models/user.model';
import { sign, verify } from 'jsonwebtoken';
import { hash, compare} from 'bcrypt';

type UserType = {
    id?: string,
    username?: string,
    email?: string
}

export const createJWT = async (user: UserType) => {
    const token = await sign({
        id: user.id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET || "mysecretekey");
    return token;
}

export const auth = (request: any, reply: any, next: any) => {
    const {authorization} = request.headers;
    
    const [_, token] = authorization?.split(" ");

    verify(token, process.env.JWT_SECRET || "mysecretekey", (err: any, decoded: any) => {        
        if(err) {
            next(new Error("Unauthorized"));
        }
        request.user = decoded;
    })

    next();
}

export const createPassword = (password: string) => hash(password, 5);

export const comparePassword = (password: string, hash: any) => compare(password, hash);

export const signin = async (request: any, reply: any) => { 
    const user = await User.findUnique({
        where: {
            ...(request.body.username ? {username: request.body.username} : {email: request.body.email,})
        }
    });
    if(!user) {
        reply.status(401).send({message: "User does not exit. Unauthorized"});
    }
    const match = await comparePassword(request.body.password, user?.password);
    console.log("Hari Om ", user, match);

    if(!match) {
        reply.status(401).send({message: "Username or Email and Password is not correct"});
    }
    const token = await createJWT({
        id: user?.id,
        username: user?.username,
        email: user?.email
    });
    reply.send({data: token })
}

export const signup = async (request: any, reply: any) => { 
    //Create User
    const user = await User.create({
        data: {
            username: request.body.username,
            email: request.body.email,
            password: await createPassword(request.body.password)
        }
    });

    //Create token
    const token = await createJWT(user);
    //send back the token
    reply.send({data: token})
}