(function ($) {
    // Drastically modified from the function in the WordPress Twenty Fifteen theme
    // Original source: https://github.com/WordPress/WordPress/blob/master/wp-content/themes/twentyfifteen/js/functions.js

    $(".dropdown-toggle").click(function (e) {
        var _this = $(this);
        e.preventDefault();
        _this.toggleClass("toggle-on");
        _this.parent().next(".sub-menu").toggleClass("toggled-on");
        _this.attr(
            "aria-expanded",
            _this.attr("aria-expanded") === "false" ? "true" : "false"
        );
        _this.html(
            _this.html() ===
                '<span class="screen-reader-text">Expand child menu</span>'
                ? '<span class="screen-reader-text">Collapse child menu</span>'
                : '<span class="screen-reader-text">Expand child menu</span>'
        );
    });
})(jQuery);

// Scroll to Top
$("a[href='#top']").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});

function checkValidKey(key) {
    var invalidKeys = ["serverData", "data", "view", "currentTarget"];
    return invalidKeys.findIndex((e) => e === key) === -1;
}

function checkValidEvent(e) {
    return e["target"]["tagName"] !== "BODY";
}

function fillterChildObject(obj) {
    result = {};
    for (const key in obj) {
        if (
            checkValidKey(key) &&
            typeof obj[key] !== "object" &&
            obj[key] !== null &&
            obj[key] !== "" &&
            typeof obj[key] !== "function"
        ) {
            result[key] = obj[key];
        }
    }
    return result;
}

function isEmpty(value) {
    for (let prop in value) {
        if (value.hasOwnProperty(prop)) return false;
    }
    return true;
}

function sendEventKafka(e) {
    const excludeElement = ["BODY"];

    if (!checkValidEvent(e)) {
        return;
    }

    var clientEvent = {};

    for (const key in e) {
        if (
            checkValidKey(key) &&
            typeof e[key] !== "object" &&
            typeof e[key] !== "function" &&
            e[key] !== null &&
            e[key] !== ""
        ) {
            clientEvent[key] = e[key];
        }
        if (
            checkValidKey(key) &&
            typeof e[key] === "object" &&
            !isEmpty(e[key])
        ) {
            clientEvent[key] = fillterChildObject(e[key]);
        }
    }
    clientEvent["target"] = fillterChildObject(e["target"]);

    clientEvent["sessionTime"] = Math.floor(
        (Date.now() - window.sessionStorage.getItem("START_TIME")) / 1000
    );
    console.log(clientEvent);
    socket.emit("event_kafka", JSON.stringify(clientEvent));
}
