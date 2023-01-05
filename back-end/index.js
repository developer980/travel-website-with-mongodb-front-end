const express = require("express")
const app = express()
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const cors = require('cors')
const axios = require('axios');
const cheerio  = require("cheerio");
const pretty = require("pretty");
const e = require("express");
const src = require("./function1");
const { resolve } = require("path");
const nodemailer = require("nodemailer")

app.use(cors())
const connectionURl = 'mongodb://127.0.0.1:27017';
const database = "travelMDB"
let db; 
let elements = []
let elements1 = []
let elements2 = []

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

        db.collection("pending_users").find(), (error, result) => {
            error && console.log(error)
            result && console.log(result)
        }
    }
)

const transport = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "confirm.test@outlook.com",
        pass:"confirm_1440"
    }
})

app.use(express.json())

app.post("/post_user", (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    console.log("Endpoint available")
    db.collection("pending_users").insertOne({
        username,
        email,
        password
    })
    const mailOptions = {
        from: "confirm.test@outlook.com",
        to: email,
        subject: "Email confirmation",
        html: `<div>
            <b>Please verify your email</b>
            <a href = "http://localhost:3000"></a>
        </div>`
    }
    transport.sendMail(mailOptions, (err, res) => {
        err ? console.log(err) : console.log("Email sent")
    })
})

//https://sp.booking.com/searchresults.en-gb.html?aid=318615&label=Catch_All-EN-131006968001-bPiN0WYm7x7ddzlXSroMLwS548793046706%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-1642216383571%3Alp1011837%3Ali%3Adec%3Adm&sid=8e1d1ad3cd8d7f925a3288aef1318628&city=-1251042;from_idr=1&ilp=1&d_dcp=1

//https://www.booking.com/searchresults.ro.html?label=munte-3tfS0Uzd3aQVUzbZzN0zKQS500104469167%3Apl%3Ata%3Ap12%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-13155828247%3Alp1011843%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YURcq_26dhSxQ4lAWSVBlCA&sid=8e1d1ad3cd8d7f925a3288aef1318628&aid=319856&city=-1965903&redirected=1&redirected_from_city=1&source=city&offset=25
// https://www.booking.com/searchresults.ro.html?aid=341360&label=metatrivago-hotel-41057_xqdz-eae923_los-1_nrm-1_gstadt-2_gstkid-0_curr-ron_lang-ro_mcid-10_dev-dsk_losb-1_bw-7_bwb-5_pg-0_dd-0_gsb-2_sl-0_w-0_tstar-0_trat-0_tprc-tprcd_tamnt-0_cod-1669756450_trvref-a4790a42-7a87-44b8-9d58-e473c81cfca3&sid=8e1d1ad3cd8d7f925a3288aef1318628&checkin=2022-12-06&checkout=2022-12-07&city=-1153951&group_adults=2&group_children=0&highlighted_hotels=41057&hlrd=with_dates&keep_landing=1&no_rooms=1&redirected=1&selected_currency=RON&show_room=4105732_118364697_0_2_0&source=hotel&trv_curr=RON&trv_dp=616&utm_campaign=ro&utm_content=los-1_nrm-1_gstadt-2_gstkid-0_curr-ron_lang-ro_mcid-10_dev-dsk_losb-1_bw-7_bwb-5_pg-0_dd-0_gsb-2_sl-0_w-0_tstar-0_trat-0_tprc-tprcd_tamnt-0_cod-1669756450_trvref-a4790a42-7a87-44b8-9d58-e473c81cfca3&utm_medium=meta&utm_source=metatrivago&utm_term=hotel-41057&room1=A,A,;
// https://www.booking.com/searchresults.ro.html?ss=Sibiu&ssne=Bucure%C8%99ti&ssne_untouched=Bucure%C8%99ti&highlighted_hotels=41057&efdco=1&label=metatrivago-hotel-41057_xqdz-eae923_los-1_nrm-1_gstadt-2_gstkid-0_curr-ron_lang-ro_mcid-10_dev-dsk_losb-1_bw-7_bwb-5_pg-0_dd-0_gsb-2_sl-0_w-0_tstar-0_trat-0_tprc-tprcd_tamnt-0_cod-1669756450_trvref-a4790a42-7a87-44b8-9d58-e473c81cfca3&sid=8e1d1ad3cd8d7f925a3288aef1318628&aid=341360&lang=ro&sb=1&src_elem=sb&src=searchresults&dest_id=-1170221&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=ro&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=faae95549ff2004a&ac_meta=GhBmYWFlOTU1NDlmZjIwMDRhIAAoATICcm86AlNpQABKAFAA&checkin=2022-12-06&checkout=2022-12-07&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure

// https://www.booking.com/searchresults.ro.html?aid=318615&label=New_Romanian_RO_RO_27026375305-LNg_O2KjtrOYqfazt2IDdgS217247418951%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi10681170931%3Atidsa-301303784602%3Alp1011843%3Ali%3Adec%3Adm&sid=8e1d1ad3cd8d7f925a3288aef1318628&checkin_monthday=04&checkin_year_month=2022-12&checkout_monthday=05&checkout_year_month=2022-12&dest_id=-1153951&dest_type=city&from_history=1&group_adults=2&group_children=0&no_rooms=1&si=ad&si=ai&si=ci&si=co&si=di&si=la&si=re&&sh_position=1

// for filters: https://www.booking.com/searchresults.ro.html?ss=Tulcea&checkin=2022-12-09&checkout=2022-12-20&group_adults=1&no_rooms=1&group_children=2
       
//https://www.booking.com/searchresults.ro.html?ss=Bucuresti&checkIn=2022-11-20&checkOut=2022-11-23

// 2nd link: https://www.trip.com/hotels/list?city=0&cityName=Tokyo

// 2nd link: https://www.expedia.com/Hotel-Search?adults=2&destination=Tulcea


//https://www.zenhotels.com/hotel/romania/arad/?q=6158&dates=13.01.2023-30.01.2023&guests=2&price=one&sid=9c1da76f-3bb1-4b9b-a9f6-8f001d2eb5f1

app.post("/get_posts", (req, res) => {
    let keyWord = req.body.keyWord
    const checkIn = {
        day:req.body.parameters.checkIn.day,
        month:req.body.parameters.checkIn.month,
        year:req.body.parameters.checkIn.year
    }
    const checkOut = {
        day:req.body.parameters.checkOut.day,
        month:req.body.parameters.checkOut.month,
        year:req.body.parameters.checkOut.year
    }
   // console.log("checkIn: " + checkIn)
   // console.log("checkOut: " + checkOut)
    let endpoint = `https://www.booking.com/searchresults.ro.html?ss=${keyWord}`
    //console.log(`https://www.booking.com/searchresults.ro.html?ss=${keyWord}`)

    elements = []
    elements1 = []
    elements2 = []

    let array_of_arrays = []

    //console.log(`https://www.booking.com/searchresults.ro.html?ss=${keyWord}${"&checkin=" + req.body.parameters.checkIn.year + "-" + req.body.parameters.checkIn.month + "-" + req.body.parameters.checkIn.day}${"&checkout=" + req.body.parameters.checkIn.year + "-" + req.body.parameters.checkIn.month + "-" + req.body.parameters.checkIn.day}`)

    //console.log(`https://www.expedia.com/Hotel-Search?destination=${keyWord}&startDate=${req.body.parameters.checkIn}${"&endDate=" + req.body.parameters.checkOut}`)
    
   // console.log(`https://www.zenhotels.com/hotel/romania/${keyWord}/?q=6158&dates=${checkIn.day}.${checkIn.month}.${checkIn.year}-${checkOut.day}.${checkOut.month}.${checkOut.year}`)

   // const promise0 = new Promise((resolve) => {
        // axios.get(`https://www.zenhotels.com/hotel/romania/${keyWord}/?q=6158&dates=${checkIn.day}.${checkIn.month}.${checkIn.year}-${checkOut.day}.${checkOut.month}.${checkOut.year}`).then((data) => {
        //     const $ = cheerio.load(data.data)
        //     $('.zen-hotelcard').each(function () {
        //         // const name = $(this).find(".uitk-layout-flex").find("h2")
        //         // const price = $(this).find(".uitk-layout-flex").find(".uitk-layout-flex").find(".uitk-layout-flex").children(".uitk-layout-flex").children(".uitk-type-200")

        //         //     elements1.push({
        //         //         name: name.text(),
        //         //         price: price.text().split(" ")[0].substring(1) * 4.64
        //         //     })
        //         console.log("html " + pretty($(this).html()))
        //     })
        //     // console.log("l2 " + elements1.length)
        //     // resolve(elements1)
        // })
    //})

    console.log(`https://www.expedia.com/Hotel-Search?destination=${keyWord}&startDate=${checkIn.year + "-" + checkIn.month + "-" + checkIn.day}${"&endDate=" + checkOut.year + "-" + checkOut.month + "-" + checkOut.day}`)

    const promise = new Promise((resolve) => {
        axios.get(`https://www.expedia.com/Hotel-Search?destination=${keyWord}&startDate=${checkIn.year + "-" + checkIn.month + "-" + checkIn.day}${"&endDate=" + checkOut.year + "-" + checkOut.month + "-" + checkOut.day}`).then((data) => {
            const $ = cheerio.load(data.data)
            $('.uitk-card').each(function () {
                const name = $(this).find(".uitk-layout-flex").find("h2")
                const price = $(this).find(".uitk-layout-flex").find(".uitk-layout-flex").find(".uitk-layout-flex").children(".uitk-layout-flex").children(".uitk-type-200")
                let url = $(this).find("a").attr("href")
                let img;

                if (url && !url.includes("https://www.expedia.com")) {
                    url = "https://www.expedia.com" + $(this).find("a").attr("href")
                } 
                
                
              //  console.log("name: " + name.text())
              //  console.log("url: " + url)

                $(this).find(".uitk-gallery-carousel-items").children(".uitk-gallery-carousel-item-current").each(function () {
                    //console.log($(this).find("img").attr("src"))
                    //if ($(this).find("img").attr("src"))
                    img = $(this).find("img").attr("src")
                })

                elements1.push({
                    name: name.text(),
                    price: price.text().split(" ")[0].substring(1).replace(",", "") * 4.64,
                    img,
                    url:[url]
                })
            })
            console.log("l2 " + elements1.length)
            resolve(elements1)
        })
    })

    console.log(`https://www.booking.com/searchresults.ro.html?ss=${keyWord}${"&checkin=" + checkIn.year + "-" + checkIn.month + "-" + checkIn.day}${"&checkout=" + checkOut.year + "-" + checkOut.month + "-" + checkOut.day}`)

    const promise1 = new Promise((resolve) => {
        axios.get(`https://www.booking.com/searchresults.ro.html?ss=${keyWord}${"&checkin=" + checkIn.year + "-" + checkIn.month + "-" + checkIn.day}${"&checkout=" + checkOut.year + "-" + checkOut.month + "-" + checkOut.day}`)
        .then((data) => {

            const $ = cheerio.load(data.data)
            !elements.length && $('.d20f4628d0').each(function (i, elem) {
                let rating_stars = 0
                //console.log("text " + $(this).text())
                const url_text = $(this).find(".ef8295f3e6").find(".fcab3ed991").text();
                const url_href = $(this).find(".ef8295f3e6").children("div").find("a").attr("href")
                const description = $(this).find(".ef8295f3e6").children(".d8eab2cf7f").text()
                const location = $(this).find(".ef8295f3e6").children("div").children(".a1fbd102d9").children("a").children("span").children(".f4bd0794db").text();
                const price = $(this).find('.fd1924b122').find(".fbd1d3018c ").text().split("lei")[0].split(".").join('')
                const img = $(this).find(".c90a25d457").find("img").attr("src")
                //console.log(pretty(img.attr("src")))
                let notes = ""
                
                if (description.includes("Proprietate Călătorii durabile")) {
                    notes = "Travel sustenabillity property"
                }
        
                $(this).find(".fbb11b26f5").children("span").each(function (item) {
                    rating_stars++
                })
                //onsole.log(rating_stars)
                if (url_text){
                    //description.length ?
                    elements.push({
                        url_text,
                        url_href:[url_href],
                        rating_stars,
                        notes,
                        img,
                        price:[{
                            website:"booking.com",
                            value:parseInt(price).toFixed(2)
                        }],
                        location: location.replace("Arată pe hartă", " ")
                    })
                }
            })
            resolve(elements)
        })

    })
    
    Promise.all([promise, promise1]).then((values) => {

        const final_result = []

        const test_array1 = []
        // for (let i = 0; i < values[0].length; i++){
        //     test_array1.push(values[0][i].name)
        // }
        for (let i = 0; i < values[1].length; i++) {
            for (let j = 0; j < values[1].length; j++) {
                if (i != j)
                    if (values[1][i].url_text == values[1][j].url_text) {
                        values[1].splice(j, j)
                    }
            }
        }
        for (let i = 0; i < values[0].length; i++) {
            for (let j = 0; j < values[0].length; j++) {
                if (i != j)
                    if (values[0][i].name == values[0][j].name) {
                        values[0].splice(j, j)
                    }
            }
        }
        const test_array = []
        for (let i = 0; i < values[0].length; i++){
            test_array.push(values[0][i].name)
        }

        for (let i = 0; i < values[1].length; i++){
            test_array1.push(values[1][i].url_text)
        }

        for (let i = 0; i < values[1].length; i++) {
            for (let j = 0; j < values[0].length; j++){

                
                //console.log(values[1][j].price)
                if (values[1][i].url_text == values[0][j].name) {
                    const price1 = values[1][i].price
                    const price2 = values[0][j].price

                    price1.push({
                        website:"expedia.com",
                        value:price2.toFixed(2)
                    })

                    values[1][i].url_href.push(values[0][j].url[0])
                }
                else if (i == values[1].length - 1) {
                    //console.log("Url: " + values[0][j].url)
                   
                    if (values[0][j].img) {
                        
                        console.log(values[0][j])
                        let n_o_elems = 0
                        for (let k = 0; k < final_result.length; k++){
                            if (final_result[k].url_text == values[0][j].name)
                            {
                                //console.log(final_result[k])
                                n_o_elems++
                            }
                        }
                       // console.log(n_o_elems)
                        !n_o_elems && final_result.push({
                            url_text: [values[0][j].name],
                            url_href: [values[0][j].url],
                            price: [{
                                website: "expedia.com",
                                value: values[0][j].price.toFixed(2)
                            }],
                            img: values[0][j].img
                        })
                    }
                }
                
            }
            values[1][i].price[0].value && final_result.push(values[1][i])
        }

        res.send(final_result)
    })
})



app.listen(3001, () => {
    console.log("Server started :)")
})
            