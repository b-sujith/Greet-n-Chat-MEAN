const exp = require("express")
const app = exp();
const userApi = require('./APIS/user')
const messApi=require('./APIS/messages')
chatApi=require('./APIS/chattedusers')
const port = process.env.PORT || 3500
const path = require("path")
const mc = require("mongodb").MongoClient;
app.listen(port, () => console.log(`server on ${port}...`))
app.use(exp.static(path.join(__dirname, './dist/chat/')))
const url="mongodb+srv://nikhil1:abdrpkljb@cluster0.g7sd3.mongodb.net/chat?retryWrites=true&w=majority";
mc.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object

        let databaseObj = client.db("chat")
        let userCollectionObj = databaseObj.collection("users")
        let chatObj=databaseObj.collection("chattedusers")
        let messObj = databaseObj.collection("messages")
        app.set("messObj",messObj);

        //create usercollection object
        app.set("userCollectionObj", userCollectionObj)
        app.set("chatObj",chatObj)


        console.log("connected to database")

    }
})
app.use("/user", userApi)
app.use("/message",messApi)
app.use("/chat",chatApi)
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})

//error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: `error is ${err.message}` })
})
