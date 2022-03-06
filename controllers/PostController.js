const db = require('../models');
const Post = db.Post;
var geolocation = require('geolocation');
var satelize = require('satelize');

const getAllPosts = async (req, res) => {
    var status = 200;
    var data = {};
    try {
        const products = await Post.findAll();
        status = 200;
        data = products;
    } catch (error) {
        status = 400;
        error = error;
        data = [];
    }  
    var response = {
        status : status,
        details : data
    };
    
    return res.status(status).json(response);
}

const getPostById = async (req, res) => {
    try {
        const product = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({status:200,details:product});
    } catch (error) {
        return res.status(500).json({status:500,details:error.message});
    }  
}

const createPost = async (req, res) => {
    var status = 200;
    var data = {};
    const request = await req.body;
    try {
        if(request.title){
            if (request.body){
                console.log(req.session.user)
                if(req.session.user){
                    let location = satelize.satelize({ip:req.connection.remoteAddress}, function(err, payload) {
                        return payload;
                    });
                    let lat = null;
                    let long = null;
                    let  createObject = {title:request.title,body:request.body,created_by:req.session.user.id,status:1,lat:lat,long:long};
                    await Post.create(createObject);
                    status = 200;
                    data = {
                        'message' : "Post Created."
                    }
                }
                else{
                    status = 400;
                    data = { "message" : "first login!"}
                }


            }
            else{
                status = 400;
                data = {
                    "message" : "body is required"
                }
            }

        }
        else{
            status = 400;
            data = {
                "message" : "title is required"
            }
        }
    } 
    catch (error) {
        console.log(error)
        status = 400;
        data = { "message" : "internal server error" }
    }
    var response = {
        status : status,
        details : data
    };
    return res.status(status).json(response); 
}



const updatePost = async (req, res) => {
    var status = 200;
    var data = {};
    const request = await req.body;
    try {
        if(request.title){
            if (request.body){
                console.log(req.session.user)
                if(req.session.user){
                    let location = satelize.satelize({ip:req.connection.remoteAddress}, function(err, payload) {
                        return payload;
                    });
                    let lat = null;
                    let long = null;
                    let  UpdateObject = {title:request.title,body:request.body,created_by:req.session.user.id,status:1,lat:lat,long:long};
                    // await Post.create(createObject);
                    await Post.update(UpdateObject, {
                        where: {
                            id: req.params.id
                        }
                    });
                    status = 200;
                    data = {
                        'message' : "Post updated."
                    }
                }
                else{
                    status = 400;
                    data = { "message" : "first login!"}
                }


            }
            else{
                status = 400;
                data = {
                    "message" : "body is required"
                }
            }

        }
        else{
            status = 400;
            data = {
                "message" : "title is required"
            }
        }
    } 
    catch (error) {
        console.log(error)
        status = 400;
        data = { "message" : "internal server error" }
    }
    var response = {
        status : status,
        details : data
    };
    return res.status(status).json(response);
    
}

const deletePost = async (req, res) => {
    var status = 200;
    var data = {};
    try {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        status = 200;
        data = 'Post Deleted';
    } catch (error) {
        status = 500;
        data = error.message;
    }  
    var response = {
        status : status,
        details : data
    };
    return res.status(status).json(response);
}

module.exports = {
    getAllPosts,getPostById,createPost,updatePost,deletePost
} 