![image](https://github.com/shridhargovindaiah/lekkada-book-api/assets/20173538/22a9b69a-c7ab-41c4-9ffd-df305a7b21e0)
Lekkada Book or Lekkada Pushtaka is Kannada word for Account Book.
As the name suggests, this is a straightforward app that helps you to keep your spending (Lekka).

Good Luck!

Tech Stack:-
1. NodeJS
2. ExpressJS or Fastify
3. Prisma
4. Postgres or MongoDB
5. Jsonwebtoken
6. bcrypt
7. Typescript

Prisma:
1. To confifure Prisma project
    $> npx prisma init
    Update .env file with DATABASE_URL with correct connection string

2. To create Schema file use following command
    $> npx prisma migrate dev --name init

    Install Prisma client
    $> npm install @prisma/client

3. Any Change in the Schema file. Pls run the below command to update Prisma client
    $> npx prisma migrate dev --name <new-name>

How to run server locally:

1. Clone the project from  git@github.com:shridhargovindaiah/lekkada-book-api.git
2. run npm install
3. Make sure you have Database URL is updated with connection string
4. Run the command:- npm run start

Following endpoints are available to test: [NOTE: this section will be updated whenever the new changes are available]

1. create new user: http://localhost:5000/signup
2. User Signin : http://localhost:5000/signin

3. Get User : http://localhost:5000/api/v1/users - GET
4. Create User : http://localhost:5000/api/v1/users - POST
5. Get User By Id: http://localhost:5000/api/v1/users/762145f4-488f-4658-bc77-046f389aa89a - GET
6. Update User Password : http://localhost:5000/api/v1/users/762145f4-488f-4658-bc77-046f389aa89a - PUT
7. Delete User : http://localhost:5000/api/v1/users/762145f4-488f-4658-bc77-046f389aa89a - DELETE

