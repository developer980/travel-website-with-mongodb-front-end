const express = require("express")
const app = express()
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const cors = require('cors')
const axios = require('axios');
const cheerio  = require("cheerio");
const pretty = require("pretty")

app.use(cors())
const connectionURl = 'mongodb://127.0.0.1:27017';
const database = "myMDB"
let db; 
const elements = []

mongoClient.connect(
    connectionURl,
    {useNewUrlParser:true},
    (err, cli) => {
        if(err) {
            console.log("Unable to connect to the database: " + err)
            return
        }

        db = cli.db(database)

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

app.post("/post_destination", (req, res) => {
    console.log("Endpoint available")
    db.collection("posts").insertOne({
        name:req.body.name,
        location:req.body.location,
        price:req.body.price
    })
})

app.get("/get_posts", (req, res) => {
    axios.get("https://sp.booking.com/searchresults.en-gb.html?aid=318615&label=Catch_All-EN-131006968001-bPiN0WYm7x7ddzlXSroMLwS548793046706%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-1642216383571%3Alp1011837%3Ali%3Adec%3Adm&sid=8e1d1ad3cd8d7f925a3288aef1318628&city=-1251042;from_idr=1&ilp=1&d_dcp=1")
    .then((data) => {
        const $ = cheerio.load(data.data)
        !elements.length && $('.ef8295f3e6').each(function(i, elem){
            console.log("text " + $(this).text())
            const url_text = $(this).children("div").children(".dd023375f5").children("h3").children("a").children(".fcab3ed991").text();
            const url_href = $(this).children("div").children(".dd023375f5").children("h3").children("a").attr("href")
            const description = $(this).children(".d8eab2cf7f").text()
            description.length && 
            elements.push({
                url_text,
                url_href,
                description: description
            })
        })
        res.send(elements)
    }).catch(err => console.log("error: " + err))
    // db.collection("posts").find().toArray(function(err, result){
    //         res.send(result)
    // })
})

app.listen(3001, () => {
    console.log("Server started :)")
})