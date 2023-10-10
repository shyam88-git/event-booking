const express=require('express');

const router=express.Router();
const{body,validationResult}=require('express-validator');
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken');

/*

USER ROUTER
USAGE:Register a user
URL:http://127.0.0.1:5000/api/users/register
params:name,email,password
access:public
method:post
 */


router.post('/register',[
    body('name').notEmpty().withMessage('Name is required'),
  
     body('password').notEmpty().withMessage('Password is required'),
    body('email').notEmpty().withMessage('Email is required')
],async(request,response)=>{
    let error=validationResult(request);
    if(!error.isEmpty()){

            return response.status(401).json({error:error.array()});
    }

   try{
        let {name,email,password}=request.body;
        //check if user is already exits or not

        let user=await User.findOne({email:email});
        if(user){

            return response.status(401).json({

                errors:[{msg:'User is already exits'}]
            });
        }

        //encrypt the password

        let salt=await bcrypt.genSalt(10);
        password =await bcrypt.hash(password,salt);

        //avatar url
        let avatar=gravatar.url(email,{

            s:'200',
            r:'pg',
            d:'mm'
        });

        let isAdmin=false;



        //save to db
        user=new User({name,email,password,avatar,isAdmin});
        user =await user.save();
        response.status(200).json({
            msg:'Registration is success'
        });

     response.status(200).json({

        msg:'Registration  is success'
     });


   }
   catch(error){
    console.error(error);
    response.status(500).json({
        errors:[
            {

                msg:error.message
            }
        ]
    });

   }
});

/* 

    USER ROUTER
    Usage:Login user
    URL:http://127.0.0.1:5000/api/users/login
    params:email,password
    method:post
    access:public
    */


    router.post('/login',[
        body('email').notEmpty().withMessage('Email is Required'),
        body('password').notEmpty().withMessage('Password is required')
    ],async(request,response)=>{

        let error=validationResult(request);
        if(!error.isEmpty()){

            return response.status(401).json({

                error:error.array()
            });

        }

        try{
            let{email,password}=request.body;
            //check if user is exits

            let user=await User.findOne({email:email});
            if(!user)
            {

                return response.status(401).json({error:[{msg:'Invalid Credentials'}]});
            }
            //check password
            let isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){

                return response.status(401).json({error:[{msg:'Invalid Credentials'}]});
            }


            //create a JWT Token
            let payload={

                user:{

                    id:user.id,
                    name:user.name
                }
            }
            jwt.sign(payload,process.env.JWT_SECRET_KEY,(err,token)=>{


                    if(err) throw err;
                    response.status(200).json({

                        msg:'Login success',
                        token:token
                    });
            });
            

            

        }
        catch(error){

            console.error(error);
            response.status(500).json({

                error:[
                    {

                        msg:error.message
                    }
                ]
            });



        }
    });


    

module.exports=router;