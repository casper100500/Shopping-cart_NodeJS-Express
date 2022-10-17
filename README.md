#  Shopping-cart_NodeJS-Express

WEB shop template based on NodeJS (Express + MongoDB)

Main futures:
- Shopping cart
- User login
- Sessions
- Stripe payments

# Usage
- Install all dependencies

```sh
npm install
```

- Create and configure your nodemon.json file:

```
{
    "env":
    { 
    "MONGO_DB": "shopping-cart",
    "MONGO_USER":"user",
    "MONGO_PASSWORD":"password",
    "jwtPassword":"somesupersecretkey",
    "expressPort":"555"
    }
}
```

- Run the server

```sh
npm start
```