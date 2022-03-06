const express = require('express');
let  router = express.Router();
const PostController = require('../controllers/PostController');
const {auth_middleware} = require('../middleware/auth');

let initPostRoutes = (app)=>{
    router.get('/',auth_middleware, PostController.getAllPosts);
    router.get('/:id',auth_middleware, PostController.getPostById);
    router.post('/',auth_middleware,PostController.createPost);
    router.patch('/:id',auth_middleware,PostController.updatePost);
    router.delete('/:id',auth_middleware,PostController.deletePost);
    return app.use("/api/posts/", router);
}
module.exports = initPostRoutes;