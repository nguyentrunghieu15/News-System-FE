var express = require("express");
var router = express.Router();
var axios = require("axios"); // node
var he = require('he');

/* GET home page. */
router.get("/:idArticle", async function (req, res, next) {
    var id =  req.params.idArticle
    var response = await axios.request({
        method: "get",
        baseURL: process.env["BACKEND_URL"],
        url: "/news/"+id,
    });
    data={}
    if (response.status === 200) {
        data = response.data;
    }
    data2string = JSON.stringify(data)
    dataEncoded = he.encode(data2string,{encodeEverything:true})
    res.render("article", {data:dataEncoded});
});

module.exports = router;
