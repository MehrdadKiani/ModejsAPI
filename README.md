# Nodejs API Example
A basic nodejs API endpoint with mongoDB

# Contents

- [Installed modules](#installed-modules)
- [Basic commands to control development and production modes](#basic-commands-to-control-development-and-production-modes)
- [Define controllers and routes](#define-controllers-and-routes)
- [Define Bootcamp model and config mongoDB connection](#define-Bootcamp-model-and-config-mongoDB-connection)
- [The main flow of data](#the-mai-flow-of-data)
- [Conceptual design of flow](#conceptual-design-of-flow)
- [Handle errors](#handle-errors)


## Installed modules
- express
- morgan
- nodemon
- dotenv
- mongoose

## Basic commands to control development and production modes
To control development and production modes, the **script** section in the **package.json** file has changed in this way:
```js
  "scripts": {
    "start": "SET NODE_ENV=production & node server",
    "dev": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
The **nodemon** module is used only as a development dependency module with running command `npm install nodemon --save-dev`. **NODE_ENV** variable is defined in **config.env** file to switch between two current modes.

- run `npm run dev` for development mode
- run `npm start` for production mode

## Define controllers and routes
All methods that operate on the ***bootcamp*** resource are defined in **bootcampController.js** file:
- `getAllBootcamps()`
- `getBootcampById()`
- `createNewBootcamp()`
- `updateAllBootcamps()`
- `updateBootcampById()`
- `deleteAllBootcamps()`
- `deleteBootcampById()`

And all routes to execute these methods are defined in **routes.js** file in this way:
```js
router.route('/api/v1/bootcamps/')
    .get(getAllBootcamps)
    .post(createNewBootcamp)
    .put(updateAllBootcamps)
    .delete(deleteAllBootcamps);

router.route('/api/v1/bootcamps/:id')
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById);
```
To mount the routes in the express server the line `app.use(router);` is added in **server.js** file. To simplify the routes, the fixed part of the url (/api/v1/bootcamps) can be set in the mounting time in this way:  
`app.use('/api/v1/bootcamps', router);`

And then the routes in **routes.js** file can be changed from `router.route('/api/v1/bootcamps/')` to `router.route('/')`.

## Define Bootcamp model and config mongoDB connection
DB Connection string is located in this path: `config/config.env` and is defined as the **MONGO_URI** variable.  
An async function would handle the connection to the database. The **connectToDB** function is defined in `config/db.js` and is called in **server.js** file.

A schema is defined in `models/Bootcamp.js` file that contains all **fields** related to Bootcamp collection.  
`const BootcampSchema = new mongoose.Schema({... fields ...})`  
And this schema is exported as a model for passing to controller methods.  

![MongoDB](images/MongoDB_chart1.png)

The bootcamp controller methods will consume the exported model in this way:
```js
const BootcampModel = require('../models/Bootcamp');

getAllBootcamps = async (req, res, next) => {
        const bootcamps = await BootcampModel.find();
}
```
The `find()` method will fetch all documents related to the bootcamp collection.

## The main flow of data
the main flow of data and things that need to be implemented when handling an HTTP request/response  

![MVC Express](images/MVC_Express.png)

## Conceptual design of flow

![NodeJs route controller mongodbModel](images/NodeJs_route_controller_mongodbModel.png)

## Handle errors
next(error);
default express error handler
errorHandler middleware
errorResponseHelper class