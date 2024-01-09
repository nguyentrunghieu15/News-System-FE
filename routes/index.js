var express = require("express");
var router = express.Router();
var axios = require("axios"); // node
var he = require("he");

/* GET home page. */
router.get("/", async function (req, res, next) {
    var response = await axios.request({
        method: "get",
        baseURL: process.env["BACKEND_URL"],
        url: "news/common-articles",
    });
    data = {};
    if (response.status === 200) {
        data = response.data;
    }
    data2string = JSON.stringify(data);
    dataEncoded = he.encode(data2string, { encodeEverything: true });
    res.render("index", { data: dataEncoded });
});

router.get("/more", async function (req, res, next) {
    var response = await axios.request({
        method: "get",
        baseURL: process.env["BACKEND_URL"],
        url: "news/common-articles",
        params:req.query
    });
    data = {};
    if (response.status === 200) {
        data = response.data;
    }
    res.send(data);
});

router.get("/search", async function (req, res, next) {
    var response = await axios.request({
        method: "get",
        baseURL: process.env["BACKEND_URL"],
        url: "news/search",
        params:req.query
    });
    data = {};
    if (response.status === 200) {
        data = response.data;
    }
    res.send(data);
});

module.exports = router;
