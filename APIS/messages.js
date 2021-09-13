const exp = require('express')
const messApi = exp.Router();
messApi.use(exp.json())
const expressErrorHandler = require('express-async-handler');

module.exports =messApi;
messApi.post('/create', expressErrorHandler(async (req, res,next)=>{
    let messObj =req.app.get('messObj')
    let chattedObj =req.app.get('chatObj')
    let user=req.body
    let chat=await chattedObj.findOne({username:user.user1})
    if (chat===null){
        await chattedObj.insertOne({username:user.user1,chatted:[user.user2]})
        console.log({username:user.user1,chatted:[user.user2]})
    }
    else{
        let k=chat.chatted;
        console.log(k)
        ppp=k.indexOf(user.user2)
        console.log(ppp)
        if(ppp==-1){
            k.push(user.user2)
            let sss={username:user.user1,chatted:k}
            let result=await chattedObj.updateOne({username:user.user1},{$set:{...sss}})
        }

    }
    chat=await chattedObj.findOne({username:user.user2})
    if (chat===null){
        await chattedObj.insertOne({username:user.user2,chatted:[user.user1]})
        console.log({username:user.user1,chatted:[user.user2]})

    }
    else{
        k=chat.chatted;
        ppp=k.indexOf(user.user1)
        if (ppp==-1){
            k.push(user.user1)
            sss={username:user.user2,chatted:k}
            result=await chattedObj.updateOne({username:user.user2},{$set:{...sss}})
        }

    }
    let ans=await messObj.findOne({user1:user.user1,user2:user.user2});
    let ans2=await messObj.findOne({user1:user.user2,user2:user.user1});
    if (ans===null){
        if(ans2===null){
            await messObj.insertOne(user);
            let ans=await messObj.findOne({user1:user.user1,user2:user.user2});
            res.send({ message:"success",latest:ans.message})
        }
        else{
            ans2.message.push(user.message[0])
            let result=await messObj.updateOne({user1:user.user2,user2:user.user1},{$set:{...ans2}})
            let ans=await messObj.findOne({user1:user.user2,user2:user.user1});
            res.send({ message:"success",latest:ans.message})
        }
    }
    else{
        let anss=await messObj.findOne({user1:user.user1,user2:user.user2});
        anss.message.push(user.message[0])

        let result=await messObj.updateOne({user1:user.user1,user2:user.user2},{$set:{...anss}})
        let ans=await messObj.findOne({user1:user.user1,user2:user.user2});

        res.send({ message:"success",latest:anss.message})

       }
}))






messApi.get('/:user1/:user2', expressErrorHandler(async (req, res)=>{
    let use1=req.params.user1
    let use2=req.params.user2
    let messObj =req.app.get('messObj')
    let ans=await messObj.findOne({user1:use1,user2:use2});
    let ans2=await messObj.findOne({user1:use2,user2:use1});
    if(ans===null){
        if(ans2===null){
            res.send({ message:"empty"})
        }
        else{
        res.send({ message:ans2.message})}
    }
    else {
        let result=ans.message;
        res.send({ message:result})
    }


}))