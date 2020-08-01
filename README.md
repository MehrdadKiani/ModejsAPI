# Nodejs API Example
A basic nodejs API endpoint with mongoDB

# Contents

- [Basic commands to control development and production modes](#basic-commands-to-control-development-and-production-modes)
- [Define controllers and routes](#define-controllers-and-routes)

### Installed modules
> - express
> - morgan
> - nodemon
> - dotenv

### Basic commands to control development and production modes
To control development and production modes, the **script** section in the **package.json** file has changed in this way:
```js
  "scripts": {
    "start": "SET NODE_ENV=production & node server",
    "dev": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
The **nodemon** module is used only as a development dependency module with running command `npm install nodemon --save-dev`. **NODE_ENV** variable is defined in **config.env** file to switch between two current modes.

> - run `npm run dev` for development mode
> - run `npm start` for production mode

### Define controllers and routes
All methods that operate on the bootcamp resource are defined in **bootcampController.js** file:
> - `getAllBootcamps()`
> - `getBootcampById()`
> - `createNewBootcamp()`
> - `updateAllBootcamps()`
> - `updateBootcampById()`
> - `deleteAllBootcamps()`
> - `deleteBootcampById()`

And all routes to these methods are defined in **routes.js** file in this way:
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
To mount the routes in the express server the line `app.use(router);` is added in **server.js** file.