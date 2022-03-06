const express = require('express');
let  router = express.Router();
const UserController = require('../controllers/UserController');

let initUserRoutes = (app)=>{
    router.post('/create_user', UserController.createUser);
    router.post('/login', UserController.loginUser);
    return app.use("/api/", router);
}
module.exports = initUserRoutes;