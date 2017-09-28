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
		$("#rightColumn").append("<h4><strong><u>" + recipeName + "</strong></u></h4>");
		$("#rightColumn").append(image);
		$("#rightColumn").append("<h5>Course: " + course + "</h5>");
	
	// Don't append cuisine if null
	if (cuisine != undefined) {
		$("#rightColumn").append("<h5>Cuisine: " + cuisine + "</h5>");
	}

	// Append matches
		$("#rightColumn").append("<h5>Cook time (Minutes): " + Math.floor(cookTime / 60) + "</h5>");
		$("#rightColumn").append("<h5>Rating ( out of 5): " + rating + "</h5>");
		$("#rightColumn").append("<h5>Ingredients:</h5>");
		$("#rightColumn").append("<p>" + ingredients + "</p>");

	// Don't append flavors if null	
	if (flavors != null) {
		$("#rightColumn").append("<p>Bitter (Flavor): " + Math.round(flavors.bitter * 100) / 100 + "</p>");

	// Append matches
		$("#rightColumn").append("<p>Meaty (Flavor): " + Math.round(flavors.meaty * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>Piquant (Flavor): " + Math.round(flavors.piquant * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>Salty (Flavor): " + Math.round(flavors.salty * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>Sour (Flavor): " + Math.round(flavors.sour * 100) / 100 + "</p>");
		$("#rightColumn").append("<p>Sweet (Flavor): " + Math.round(flavors.sweet * 100) / 100 + "</p>");
	}

	
	}
	// Zomato API ajax call
		$.ajax({
     datatype: "json" , 
     url: "https://developers.zomato.com/api/v2.1/search",
     method: 'GET' , 
     headers: {'user-key' : '6c23e886ba2a04e9caeef4ff77b522ac',},
     
	}).done(function(result) {
    console.log(result);

    // To save result
    var restaurants = result.restaurants;

    // For loop for restaurant array
	for (var j = 0; j < restaurants.length; j++) {
		var money = restaurants[j].restaurant.currency;
		var restaurantName = restaurants[j].restaurant.name;
		var address = restaurants[j].restaurant.location.address;
		var userRating = restaurants[j].restaurant.user_rating.aggregate_rating;
		var zipcode = restaurants[j].restaurant.location.zipcode;
		var photoURL = restaurants[j].restaurant.photos_url;
		var photo = $("<img/>",{
			id: "restaurantImage",
			src: photoURL
		})
	}

	// Console log loop
		console.log(money);
		console.log(restaurantName);
		console.log(address);
		console.log(userRating);
		console.log(zipcode);
		console.log(photoURL);

	// Append results to the screen
		$("#leftColumn").append("<h4><strong><u>" + restaurantName + "</strong></u></h4>");
		$("#leftColumn").append(photo);
		$("#leftColumn").append("<h5>Address: " + address + "</h5>");
		$("#leftColumn").append("<h5>Zipcode: " + zipcode + "</h5>");
		$("#leftColumn").append("<h5>Rating: " + userRating + "</h5>");
		$("#leftColumn").append("<h5>Price: " + money + "</h5>");

	});

		
	});
		
		// Clearch the search textbox after user presses submit
		$("#food").val("");
		
		// Clear old results when entering new search
		$("#rightColumn").empty();
		$("#leftColumn").empty();
	
	});

	
