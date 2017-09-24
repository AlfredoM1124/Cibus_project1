// Initial array of recipes //
var recipes = [0];



	// Function to handle events when search button is clicked //
	$("#search").on("click", function(event) {
		event.preventDefault();

	// To grap information from textbox
	var food = $("#food").val().trim();

	// Yummly API
	var qeryURL = "http://api.yummly.com/v1/api/recipes?_app_id=b880a9fb&_app_key=9b4724af830829788e087c48dad653e7&q=" + food + "&requirePictures=true&";
	
	// Create AJAX call for button being clicked //
	$.ajax({
		url: qeryURL,
		method: "GET"

	// Function after data from AJAX comes back //
	})
	.done(function(response) {
		console.log(response);


	// To save the response //
	var matches = response.matches;
	
	// Loop through yummly api array
	for (var i = 0; i < matches.length; i++) {
		var ingredients = matches[i].ingredients;
		var recipeName = matches[i].recipeName;
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
		console.log(ingredients);
		console.log(recipeName);
		console.log(flavors);
		console.log(rating);
		console.log(course);
		console.log(cuisine);
		console.log(imageUrl);


		// Append recipe matches  //
		$("#rightColumn").append("<h4>" + recipeName + "</h4>");
		$("#rightColumn").append("<h5>Course: " + course + "</h5>");
		$("#rightColumn").append("<h5>Cuisine: " + cuisine + "</h5>");
		$("#rightColumn").append("<h5>Rating ( out of 5): " + rating + "</h5>");
		$("#rightColumn").append(image);
		$("#rightColumn").append("<h5>Ingredients</h5>");
		$("#rightColumn").append("<p>" + ingredients + "</p>");
		$("#rightColumn").append("<p>Bitter: " + Math.round(flavors.bitter * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>meaty: " + Math.round(flavors.meaty * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>piquant: " + Math.round(flavors.piquant * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>salty: " + Math.round(flavors.salty * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>sour: " + Math.round(flavors.sour * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>sweet: " + Math.round(flavors.sweet * 100) / 100 + "</p>");
	}

		
	});


		// Add new recipes into the array //
		recipes.push(recipes);
		
	
	});

	
