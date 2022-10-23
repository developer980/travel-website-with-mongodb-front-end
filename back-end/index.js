const express = require("express")
const app = express()
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURl = 'mongodb://127.0.0.1:27017';
const database = "myMDB"

mongoClient.connect(
    connectionURl,
    {useNewUrlParser:true},
    (err, cli) => {
        if(err) {
            console.log("Unable to connect to the database: " + err)
            return
        }

        const db = cli.db(database)

        // db.collection('posts').insertOne({
        //     name:"Tudor",
        //     age:20
        // })

        db.collection("posts").find(), (error, result) => {
            error && console.log(error)
            result && console.log("Data retrieved succesfully")
        }
    }
)

app.use(express.json())

app.listen(3000, () => {
    console.log("Server started :)")
})