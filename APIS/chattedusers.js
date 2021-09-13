const exp = require('express')
const chattedApi = exp.Router();
chattedApi.use(exp.json())
const expressErrorHandler = require('express-async-handler');

module.exports =chattedApi;

chattedApi.get('/getusers/:username',expressErrorHandler(async (req,res,next)=>{
       //getting username from url parameter
       let un=req.params.username;
       let userCollectionObj = req.app.get("userCollectionObj")

       //database object
       let chattedObj =req.app.get('chatObj')

       let chat=await chattedObj.findOne({username:un})
       
       if(chat===null){
           res.send({ message: "Connect with friends"});
       }
       else{
           let chatArray=chat.chatted;
           l=chatArray.length
           users=[]
           for(let i=0;i<l;i++){
            let user=await userCollectionObj.findOne({username:chatArray[i]})
            users.push(user)
           }
           res.send({message: users})
       }
}))