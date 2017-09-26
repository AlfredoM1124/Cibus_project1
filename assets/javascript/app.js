// Initial array of recipes //
var recipes = [0];

	// Function to handle events when search button is clicked //
	$("#search").on("click", function(event) {
		event.preventDefault();

	// To grab information from textbox //
	var food = $("#food").val().trim();

	// Yummly API //
	var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=b880a9fb&_app_key=9b4724af830829788e087c48dad653e7&q=" + food + "&requirePictures=true&&start=10&";
	
	// Create AJAX call for button being clicked //
	$.ajax({
		url: queryURL,
		method: "GET"

	// Function after data from AJAX comes back //
	})
	.done(function(response) {
		console.log(response);

	// To save the response //
	var matches = response.matches;
	
	// Loop through yummly api array
	for (var i = 0; i < matches.length; i++) {
		var recipeName = matches[i].recipeName;
		var cookTime = matches[i].totalTimeInSeconds;
		var ingredients = matches[i].ingredients;
		var flavors = matches[i].flavors;
		var rating = matches[i].rating;
		var course = matches[i].attributes.course;
		var cuisine = matches[i].attributes.cuisine;
		var imageUrl = matches[i].smallImageUrls;
		var image = $("<img/>",{
			id: "recipeImage",
			src: imageUrl
		})

		// Console log loop
		console.log(recipeName);
		console.log(ingredients);
		console.log(cookTime);
		console.log(flavors);
		console.log(rating);
		// console.log(course);
		// console.log(cuisine);
		console.log(imageUrl);

		// Append recipe matches  //
		$(".card-content").append("<h4><strong>" + recipeName + "</strong></h4>");
		$(".card-content").append(image);
		// $(".card-content").append("<h5>Course: " + course + "</h5>");
		// $(".card-content").append("<h5>Cuisine: " + cuisine + "</h5>");
		$(".card-content").append("<h5>Cook time (Minutes): " + Math.floor(cookTime / 60) + "</h5>");
		$(".card-content").append("<h5>Rating ( out of 5): " + rating + "</h5>");
		$(".card-content").append("<h5>Ingredients:</h5>");
		$(".card-content").append("<p>" + ingredients + "</p>");
		$(".card-content").append("<p>Bitter (Flavor): " + Math.round(flavors.bitter * 100) / 100 + "</p>");
		$(".card-content").append("<p>Meaty (Flavor): " + Math.round(flavors.meaty * 100) / 100 + "</p>");
		$(".card-content").append("<p>Piquant (Flavor): " + Math.round(flavors.piquant * 100) / 100 + "</p>");
		$(".card-content").append("<p>Salty (Flavor): " + Math.round(flavors.salty * 100) / 100 + "</p>");
		$(".card-content").append("<p>Sour (Flavor): " + Math.round(flavors.sour * 100) / 100 + "</p>");
		$(".card-content").append("<p>Sweet (Flavor): " + Math.round(flavors.sweet * 100) / 100 + "</p>");
	}
		
	});


		// Add new recipes into the array //
		recipes.push(recipes);

		// Clearch the search textbox after user presses submit
		$("#food").val("");
		
		// Clear old results when entering new search
		$(".card-content").empty();
	
	});

	
