# Nodejs API Example

#### Basic commands to control development and production modes
To control development and production modes, **script** section in the **package.json** file has changed in this way:
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