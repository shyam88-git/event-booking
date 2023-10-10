const express=require('express');
const app=express();


const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');




//configure the corse

app.use(cors());


//configure the express to receive the form data

app.use(express.json());



//configure the dotenv

dotEnv.config();



const hostname=process.env.HOST_NAME;
const port=process.env.PORT;


//connect to mongodb database


mongoose.connect(process.env.MONGO_DB_LOCAL_URL).then((response)=>{

    console.log("Connected to mongodb database successfully");
}).catch((error)=>{

    console.error(error);
    process.exit(1);
});


//basic request

app.get('/',(request,response)=>{
    response.send(`welcome to event booking app`);
});



//router configuration


app.router('/api/users',require('./router/userRouter'));
app.router('/api/events',require('./router/eventRouter'));

app.listen(port,hostname,()=>{

    console.log(`Express server is started at http://${hostname}:${port}`);


})

