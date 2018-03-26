$(document).ready(function () {
    var topics = ["cat", "dog", "bird", "goat"];


    function displayGif() {
        $("#gif-view").empty();
        var gifData = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifData + "&api_key=dc6zaTOxFJmzC&limit=12";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var gify = response.data;

            for (var i = 0; i < gify.length; i++) {

                var gifDiv = $("<div class='gif col-md-3'>");

                var rate = gify[i].rating;

                var p = $("<p>").text("Rating: " + rate);

                var gifURL = gify[i].images.fixed_height_still.url;

                var image = $("<img>").attr("src", gifURL);

                image.attr("data-still", gify[i].images.fixed_height_still.url);
                image.attr("data-animate", gify[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("gif");

                gifDiv.append(p, image);

                $("#gif-view").prepend(gifDiv);
            }
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });

    }

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var btn = $("<button>");
            btn.addClass("gif-btn");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#buttons-view").append(btn);
        }
    }

    $("#add-gif").on("click", function (event) {

        event.preventDefault();

        var grabInput = $("#gif-input").val().trim();

        $("#gif-input").val("");

        if (grabInput === "") {
            return;
        }
        topics.push(grabInput);
        renderButtons();


    });

    $(document).on("click", ".gif-btn", displayGif);
    renderButtons();


});
