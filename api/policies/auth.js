module.exports = async function(req,res,next) {
    
   try {
    var date = new Date();
    var userToken = req.headers.authorization;
    var token = await Token.findOne({token : userToken})

    if(token && Number(token.updatedAt) + 600000 > date.getTime() && token.is_admin === false){
        return next();
    }
    
    return res.json(
        {
            error : "User not found"
        }
    )
   }

   catch(err) {
       return res.json(
           {error : "User not found"}
       )
   }

}