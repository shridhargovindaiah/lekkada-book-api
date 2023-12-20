const jwt = require("jsonwebtoken");

export const auth = (request: any, reply: any, next: any) => {
    console.log("Hari om Auth");
    const {token} = request.headers;

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        console.log("verified token", err, decoded);
        if(err) {
            next(new Error("Unauthorized"));
        }

        request.user = decoded;
    })

    next();
}

export const signin = (request: any, reply: any) => { 
    reply.send({message: "Signin request "});    
}

export const signup = (request: any, reply: any) => { }