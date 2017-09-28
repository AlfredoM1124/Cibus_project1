	// Function to handle events when search button is clicked //
	$("#search").on("click", function(event) {
		event.preventDefault();

	// To grap information from textbox
	var food = $("#food").val().trim();

	// Yummly API
	var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=b880a9fb&_app_key=9b4724af830829788e087c48dad653e7&q=" + food + "&requirePictures=true&&start=10&";
	
	// Create AJAX call for button being clicked //
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	
	// Function after data from AJAX comes back //
	.done(function(response) {
		console.log(response);

	// To save the response //
	var matches = response.matches;
	console.log(matches.length);
	
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

		//Console log the for loop
		console.log(recipeName);
		console.log(ingredients);
		console.log(cookTime);
		console.log(flavors);
		console.log(rating);
		console.log(course);
		console.log(cuisine);
		console.log(imageUrl);

	// Append recipeName, image, course
		$("#rightContent").append("<h4><strong><u>" + recipeName + "</strong></u></h4>");
		$("#rightContent").append(image);
		$("#rightContent").append("<h5>Course: " + course + "</h5>");
	
	// Don't append cuisine if null
	if (cuisine != undefined) {
		$("#rightContent").append("<h5>Cuisine: " + cuisine + "</h5>");
	}

	// Append matches
		$("#rightContent").append("<h5>Cook time (Minutes): " + Math.floor(cookTime / 60) + "</h5>");
		$("#rightContent").append("<h5>Rating ( out of 5): " + rating + "</h5>");
		$("#rightContent").append("<h5>Ingredients:</h5>");
		$("#rightContent").append("<p>" + ingredients + "</p>");

	// Don't append flavors if null	
	if (flavors != null) {
		$("#rightContent").append("<p>Bitter (Flavor): " + Math.round(flavors.bitter * 100) / 100 + "</p>");

	// Append matches
		$("#rightContent").append("<p>Meaty (Flavor): " + Math.round(flavors.meaty * 100) / 100 + "</p>");
		$("#rightContent").append("<p>Piquant (Flavor): " + Math.round(flavors.piquant * 100) / 100 + "</p>");
		$("#rightContent").append("<p>Salty (Flavor): " + Math.round(flavors.salty * 100) / 100 + "</p>");
		$("#rightContent").append("<p>Sour (Flavor): " + Math.round(flavors.sour * 100) / 100 + "</p>");
		$("#rightContent").append("<p>Sweet (Flavor): " + Math.round(flavors.sweet * 100) / 100 + "</p>");
	}

	
	}
	// Zomato API ajax call
		$.ajax({
     datatype: "json" , 
     url: "https://developers.zomato.com/api/v2.1/search?entity_id=601&entity_type=city&count=10&radius=1000&category=10",
     method: 'GET' , 
     headers: {'user-key' : '6c23e886ba2a04e9caeef4ff77b522ac',},
     
	}).done(function(result) {
    console.log(result);

    // To save result
    var restaurants = result.restaurants;

    // For loop for restaurant array
	for (var j = 0; j < restaurants.length; j++) {
		var restaurantName = restaurants[j].restaurant.name;
		var address = restaurants[j].restaurant.location.address;
		var location = restaurants[j].restaurant.location.city;
		var zipcode = restaurants[j].restaurant.location.zipcode;
		var userRating = restaurants[j].restaurant.user_rating.aggregate_rating;
		var textRating = restaurants[j].restaurant.user_rating.rating_text;
		
	}

	// Console log loop
		console.log(restaurantName);
		console.log(address);
		console.log(location);
		console.log(zipcode);
		console.log(userRating);
		console.log(textRating);
		
	// Append results to the screen

		$("#leftContent").append("<h4><strong><u>" + restaurantName + "</strong></u></h4>");
		// $("#leftContent").append(photo);
		$("#leftContent").append("<h5>Address: " + address + "</h5>");
		$("#leftContent").append("<h5>Location: " + location + "</h5>");
		$("#leftContent").append("<h5>Zipcode: " + zipcode + "</h5>");
		$("#leftContent").append("<h5>Rating: " + userRating + "</h5>");
		$("#leftContent").append("<h5>Avg. comment: " + textRating + "</h5>");
		

	});

		
	});
		
		// Clearch the search textbox after user presses submit
		$("#food").val("");
		$("#location").val("");
		
		// Clear old results when entering new search
		$("#rightContent").empty();
		$("#leftContent").empty();
	
	});

	
