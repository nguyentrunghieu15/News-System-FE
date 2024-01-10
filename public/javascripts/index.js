var buttonMore = $("#btnMore")[0];
var searchInput = $("#searchInput")[0];
var skip = 0;

searchInput.addEventListener("keydown", async function (event) {
    if (event.keyCode === 13) {
        let value = searchInput.value;
        value = value.trim();
        if (value.length !== 0) {
            skip = 0;
            const response = await axios.request({
                method: "get",
                url: "search",
                params: {
                    q: value,
                    skip: skip,
                },
            });
            const data = response.data;
            clearMain();
            insertDataIntoMain(data, "List result search for you");
        } else {
            window.location.href = "/";
        }
    }
});

buttonMore.addEventListener("click", async function (event) {
    skip += 9;
    let value = searchInput.value;
    value = value.trim();
    if (value.length !== 0) {
        const response = await axios.request({
            method: "get",
            url: "search",
            params: {
                q: value,
                skip: skip,
            },
        });
        const data = response.data;
        insertDataIntoMain(data);
    } else {
        const response = await axios.request({
            method: "get",
            url: "more",
            params: {
                skip: skip,
            },
        });
        const data = response.data;
        insertDataIntoMain(data);
    }
});


