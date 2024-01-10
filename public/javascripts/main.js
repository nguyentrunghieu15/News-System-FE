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

function sendEventKafka(e) {
    const excludeElement = ["BODY"];

    if (
        excludeElement.findIndex(
            (value) => e["originalTarget"]["tagName"] === value
        ) !== -1
    ) {
        return;
    }

    const listKey = [
        "clientX",
        "clientY",
        "layerX",
        "layerY",
        "pageX",
        "pageX",
        "type",
        "originalTarget.baseURI",
        "originalTarget.innerHTML",
        "originalTarget.innerText",
        "originalTarget.localName",
        "originalTarget.nodeName",
        "originalTarget.outerHTML",
        "originalTarget.outerHTML",
        "originalTarget.tagName",
        "originalTarget.textContent",
        "originalTarget.title",
        "originalTarget.alt",
    ];
    var clientEvent = {};
    listKey.forEach(function (key) {
        var keyParts = key.split("."); // Handle nested properties
        var value = e;
        for (var i = 0; i < keyParts.length; i++) {
            value = value[keyParts[i]];
            if (value === undefined) {
                // Handle undefined values
                break;
            }
        }
        clientEvent[key] = value;
    });

    clientEvent["sessionTime"] = Math.floor(
        (Date.now() - window.localStorage.getItem("START_TIME")) / 1000
    );

    socket.emit("event_kafka", JSON.stringify(clientEvent));
}
