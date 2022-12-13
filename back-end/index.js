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

app.use(cors())
const connectionURl = 'mongodb://127.0.0.1:27017';
const database = "myMDB"
let db; 
let elements = []
let elements1 = []

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

//https://sp.booking.com/searchresults.en-gb.html?aid=318615&label=Catch_All-EN-131006968001-bPiN0WYm7x7ddzlXSroMLwS548793046706%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-1642216383571%3Alp1011837%3Ali%3Adec%3Adm&sid=8e1d1ad3cd8d7f925a3288aef1318628&city=-1251042;from_idr=1&ilp=1&d_dcp=1

//https://www.booking.com/searchresults.ro.html?label=munte-3tfS0Uzd3aQVUzbZzN0zKQS500104469167%3Apl%3Ata%3Ap12%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-13155828247%3Alp1011843%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YURcq_26dhSxQ4lAWSVBlCA&sid=8e1d1ad3cd8d7f925a3288aef1318628&aid=319856&city=-1965903&redirected=1&redirected_from_city=1&source=city&offset=25
// https://www.booking.com/searchresults.ro.html?aid=341360&label=metatrivago-hotel-41057_xqdz-eae923_los-1_nrm-1_gstadt-2_gstkid-0_curr-ron_lang-ro_mcid-10_dev-dsk_losb-1_bw-7_bwb-5_pg-0_dd-0_gsb-2_sl-0_w-0_tstar-0_trat-0_tprc-tprcd_tamnt-0_cod-1669756450_trvref-a4790a42-7a87-44b8-9d58-e473c81cfca3&sid=8e1d1ad3cd8d7f925a3288aef1318628&checkin=2022-12-06&checkout=2022-12-07&city=-1153951&group_adults=2&group_children=0&highlighted_hotels=41057&hlrd=with_dates&keep_landing=1&no_rooms=1&redirected=1&selected_currency=RON&show_room=4105732_118364697_0_2_0&source=hotel&trv_curr=RON&trv_dp=616&utm_campaign=ro&utm_content=los-1_nrm-1_gstadt-2_gstkid-0_curr-ron_lang-ro_mcid-10_dev-dsk_losb-1_bw-7_bwb-5_pg-0_dd-0_gsb-2_sl-0_w-0_tstar-0_trat-0_tprc-tprcd_tamnt-0_cod-1669756450_trvref-a4790a42-7a87-44b8-9d58-e473c81cfca3&utm_medium=meta&utm_source=metatrivago&utm_term=hotel-41057&room1=A,A,;
// https://www.booking.com/searchresults.ro.html?ss=Sibiu&ssne=Bucure%C8%99ti&ssne_untouched=Bucure%C8%99ti&highlighted_hotels=41057&efdco=1&label=metatrivago-hotel-41057_xqdz-eae923_los-1_nrm-1_gstadt-2_gstkid-0_curr-ron_lang-ro_mcid-10_dev-dsk_losb-1_bw-7_bwb-5_pg-0_dd-0_gsb-2_sl-0_w-0_tstar-0_trat-0_tprc-tprcd_tamnt-0_cod-1669756450_trvref-a4790a42-7a87-44b8-9d58-e473c81cfca3&sid=8e1d1ad3cd8d7f925a3288aef1318628&aid=341360&lang=ro&sb=1&src_elem=sb&src=searchresults&dest_id=-1170221&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=ro&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=faae95549ff2004a&ac_meta=GhBmYWFlOTU1NDlmZjIwMDRhIAAoATICcm86AlNpQABKAFAA&checkin=2022-12-06&checkout=2022-12-07&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure

// https://www.booking.com/searchresults.ro.html?aid=318615&label=New_Romanian_RO_RO_27026375305-LNg_O2KjtrOYqfazt2IDdgS217247418951%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi10681170931%3Atidsa-301303784602%3Alp1011843%3Ali%3Adec%3Adm&sid=8e1d1ad3cd8d7f925a3288aef1318628&checkin_monthday=04&checkin_year_month=2022-12&checkout_monthday=05&checkout_year_month=2022-12&dest_id=-1153951&dest_type=city&from_history=1&group_adults=2&group_children=0&no_rooms=1&si=ad&si=ai&si=ci&si=co&si=di&si=la&si=re&&sh_position=1

// for filters: https://www.booking.com/searchresults.ro.html?ss=Tulcea&checkin=2022-12-09&checkout=2022-12-20&group_adults=1&no_rooms=1&group_children=2
       
//https://www.booking.com/searchresults.ro.html?ss=Bucuresti&checkIn=2022-11-20&checkOut=2022-11-23

// 2nd link: https://www.trip.com/hotels/list?city=0&cityName=Tokyo

// 2nd link: https://www.expedia.com/Hotel-Search?adults=2&destination=Tulcea


app.post("/get_posts", (req, res) => {
    let keyWord = req.body.keyWord
    const checkIn = "&checkIn=" + req.body.parameters.checkIn
    const checkOut = "&checkOut=" + req.body.parameters.checkOut
    console.log("checkIn: " + checkIn)
    console.log("checkOut: " + checkOut)
    let endpoint = `https://www.booking.com/searchresults.ro.html?ss=${keyWord}`
    //console.log(`https://www.booking.com/searchresults.ro.html?ss=${keyWord}`)

    elements = []
    elements1 = []

    axios.get(`https://www.expedia.com/Hotel-Search?adults=2&destination=${keyWord}`).then((data) => {
        const $ = cheerio.load(data.data)
        $('.uitk-card').each(function () {
            const name = $(this).find(".uitk-layout-flex").find("h2")
            const price = $(this).find(".uitk-layout-flex").find(".uitk-layout-flex").find(".uitk-lockup-price")
            if (price.text()) {
                console.log("Hotel: " + name.text() + " Price: " + price.text())
                elements1.push({
                    name: name,
                    price:price
                })
            }
            else return
        })
    })

    axios.get(`https://www.booking.com/searchresults.ro.html?ss=${keyWord}${checkIn}${checkOut}`)
        .then((data) => {
        //console.log(`https://www.booking.com/searchresults.ro.html?ss=${keyWord}${checkIn}${checkOut}`)
        const $ = cheerio.load(data.data)
        !elements.length && $('.ef8295f3e6').each(function (i, elem) {
            let rating_stars = 0
            //console.log("text " + $(this).text())
            const url_text = $(this).find(".fcab3ed991").text();
            const url_href = $(this).children("div").find("a").attr("href")
            const description = $(this).children(".d8eab2cf7f").text()
            const location = $(this).children("div").children(".a1fbd102d9").children("a").children("span").children(".f4bd0794db").text();
            let notes = ""

            if (description.includes("Proprietate Călătorii durabile")) {
                notes = "Travel sustenabillity property"
            }
            
            $(this).find(".fbb11b26f5").children("span").each(function (item) {
                rating_stars++
            })
           //onsole.log(rating_stars)
            if(url_text)
                description.length ? 
                    elements.push({
                        url_text,
                        url_href,
                        rating_stars,
                        description: description.replace("Proprietate Călătorii durabile", ""),
                        notes,
                        location:location.replace("Arată pe hartă", " - Show on the map")
                    }) : elements.push({
                            url_text,
                            url_href,
                            rating_stars,
                            description: "Check the destination page",
                            notes,
                            location:location.replace("Arată pe hartă", " - Show on the map")
                        })
                
        })
        //console.log(elements)
        res.send(elements)
    }).catch(err => console.log("error: " + err))
    
    //src.function1(keyWord)
})

app.listen(3001, () => {
    console.log("Server started :)")
})