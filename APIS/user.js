const exp = require('express')
const userApi = exp.Router();
userApi.use(exp.json())
const expressErrorHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
module.exports =userApi;

const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
cloudinary.config({

    cloud_name: "dmwmgtsuj",
  
    api_key: "447987196625791",
  
    api_secret: "Jp2YG_UW7f7qsau6qO8ul33eEnU",
  
  });
  
  
  
  const storage = new CloudinaryStorage({
  
    cloudinary: cloudinary,
  
    params:async (req, file) => {
  
        return {
  
        folder: 'default',      
  
        public_id: file.fieldname + '-' + Date.now()

      
  
    }},
  
  });
  var multerObj = multer( { storage: storage });
userApi.post("/create",multerObj.single('photo'), expressErrorHandler(async (req, res, next) => {

    let userCollectionObj = req.app.get("userCollectionObj")

    //get user obj
    let newUser = JSON.parse(req.body.userObj)
    console.log(newUser)

    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" });
    }
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password
        newUser.password = hashedPassword;
        //add image url
        //insert
        newUser.profileImage=req.file.path;
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "User created" })
    }
}))








userApi.post('/login', expressErrorHandler(async (req, res) => {
    let userCollectionObj = req.app.get("userCollectionObj")

    //get user credetials
    let credentials = req.body;
    //search user by username
    let user = await userCollectionObj.findOne({ username: credentials.username })
    //if user not found
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //compare the password
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if not matched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create a token
            let signedToken = jwt.sign({ username: credentials.username }, 'abcdef', { expiresIn: 10 })
            //send token to client
            res.send({ message: "login success", token: signedToken, username: credentials.username, userObj: user })
        }

    }

}))


userApi.post('/change',multerObj.single('photo'), expressErrorHandler(async (req, res)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    let user = JSON.parse(req.body.userObj)
    let userss = await userCollectionObj.findOne({ username: user.username })
    if (req.file!=undefined){
        user.profileImage=req.file.path;
        }
        else {
            user.profileImage="";
        }
    if (user.email==""){
        user.email=userss.email
    }
    if (user.profileImage==""){
        user.profileImage=userss.profileImage
    }
    user.password = userss.password
    await userCollectionObj.updateOne({username:user.username},{$set:{...user}})
    userss = await userCollectionObj.findOne({ username: user.username })

    res.send({message:userss})


}))





userApi.get('/userlist',expressErrorHandler(async (req, res)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    let userlist=await userCollectionObj.find().toArray()
    res.send({ message: userlist})
}))