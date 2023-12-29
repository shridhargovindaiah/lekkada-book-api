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
    const {username, email, password} = request.body;
    const user = await User.findUnique({
        where: {
            ...(username ? {username} : {email})
        }
    });
    if(!user) {
        reply.status(401).send({message: "User does not exit. Unauthorized"});
    }
    const match = await comparePassword(password, user?.password);

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
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        bio
    } = request.body;
    const user = await User.create({
        data: {
            username: username,
            email: email,
            password: await createPassword(password),
            profile: {
                create: {
                    fname: firstName,
                    lname: lastName,
                    bio
                }
            }
        }
    });

    //Create token
    const token = await createJWT(user);
    //send back the token
    reply.send({data: token})
}