const jwt=require('jsonwebtoken');
let authenticate=(request,response,next)=>{

    //get a token from header

    const token=request.header('x-auth-token');
    if(!token){

        return response.status(401).json({msg:'No Token ,authentication denied'});

    }

    //verify the token

    try{

        let decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        request.user=decoded.user;
        next();
    }

    catch(error){

        response.status(401).json({

            msg:'Token is not valid'
        });
    }
}