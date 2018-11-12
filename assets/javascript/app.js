var animals = ["dog", "cat", "bird", "fish", "rabbit", "squirrel", "raccoon", "llama", "horse", "goat", "bear", "seal", "lion", "giraffe", "zebra", "dolphin", "whale"];

function renderButtons() {

    $("#button-div").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-success");
        a.attr("id", "animal");
        a.attr("data-animal", animals[i]);
        a.text(animals[i]);
        $("#button-div").append(a);
    }
}

$("#add-button").on("click", function(event) {
    event.preventDefault();

    var animal = $("#add-animal").val().trim();

    animals.push(animal);

    renderButtons();
});

$(document).on("click", "#animal", function() {
    var animal = $(this).attr("data-animal");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=04PjZ5qNEHV6XsxkPJTJDunQhK0mt7H8&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        
        var results = response.data;

        
        for (var i = 0; i < results.length; i++) {

          
          var animalDiv = $("<div class='col'>");

         
          var p = $("<p>").text("Rating: " + results[i].rating);

          
          var animalImage = $("<img>");
          
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-still", results[i].images.fixed_height_still.url)
          animalImage.attr("data-animate", results[i].images.fixed_height.url)
          animalImage.attr("data-state", "still")
          animalImage.addClass("gif")

          
          animalDiv.append(p);
          animalDiv.append(animalImage);

          
          $("#gif-div").prepend(animalDiv);
        }
    });
});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

});

renderButtons();