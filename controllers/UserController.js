const db = require('../models');
const User = db.User;
const {genSaltSync,hashSync,compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');

const createUser = async (req, res) => {
    var status = 200;
    var data = {};
    const request = await req.body;
    try {
        if(request.name){
            if(request.email){
                if(request.password){
                    var salt = genSaltSync(10);
                    request.password = hashSync(request.password,salt);
                    let  createUserObject = {name:request.name,email:request.email,password:request.password};
                    await User.create(createUserObject);
                    status = 200;
                    data = {
                        "message" : "user created..."
                    }
                }
                else{
                    status = 400;
                    data = {
                        "message" : "password is required"
                    }
                }
            }
            else{
                status = 400;
                data = {
                    "message" : "email is required"
                }
            }
        }
        else{
            status = 400;
            data = {
                "message" : "name is required"
            }
        }
    } catch (error) {
        status = 400;
        data = { "message" : "internal server error" }
    } 
    var response = {
        status : status,
        details : data
    };
    return res.status(status).json(response); 
}

const loginUser = async (req,res)=>{
    const request = await req.body;
    var status = 200;
    var data = {};
    if(request.email){
        if(request.password){
            var getuser = await User.findOne({
                where :{
                    email : request.email
                }
            });
            if(!getuser){
                status = 401;
                data = {
                    "message" : "user does not exist "
                }
            }
            else{
                var pass_result = compareSync(request.password,getuser.password);
                if(pass_result){
                    const jsonwebtoken = sign({result:getuser},'qwe1234',{expiresIn : '1h'});
                    session = req.session;
                    session.user = getuser;
                    status = 200;
                    data = {
                        'message' : "Login success",
                        'token' : jsonwebtoken
                    }
                }
                else{
                    status = 401;
                    data = {
                        "message" : "Invalid password"
                    }
                }
            }
            
        }
        else{
            status = 400;
            data = {
                "message" : "password is required"
            }
        }
    }
    else{
        status = 400;
        data = {
            "message" : "email is required"
        }
    }
    var response = {
        status : status,
        details : data
    };
    
    return res.status(status).json(response);
};
module.exports = {
    createUser,loginUser
} 