const {verify} = require('jsonwebtoken');


const auth_middleware = (req,res,next)=>{
    let token = req.get('Authorization');
    if(token){
        token = token.slice(7);
        verify(token,'qwe1234',(error,decode)=>{
            if(error){
                return res.json({
                    success: 0,
                    message: "Invalid token!"
                })
            }
            else{
                next();
            }
        });
    }
    else{
        return res.json({
            success: 0,
            message: "Access Denied Unothorized user !"
        })
    }
}
module.exports = {
    auth_middleware
}