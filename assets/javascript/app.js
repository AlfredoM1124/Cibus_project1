	//Click and Enter key events
	$("#search").on("click", function(event) {
		Enter(event);
	})
	$("#food").keypress(function(event) {
    if(event.which == 13) {
        Enter(event);
    }
});
	// Function to handle events when search button is clicked //
	 function Enter(event) {
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
	// console.log(response);

	// To save the response //
	var matches = response.matches;
	// console.log(matches.length);
	
	// To select div matching id
		var recipeDiv = $("#rightContent");

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

	// Create new div for each of the matches
		var newRecipeDiv = $("<div>" + matches[i] + "</div>");

	// Append to rightContent
		recipeDiv.append("<h4><strong><u>" + recipeName + "</strong></u></h4>");
		recipeDiv.append(image);
		recipeDiv.append("<h5>Cook time (Minutes): " + Math.floor(cookTime / 60) + "</h5>");
		recipeDiv.append("<h5>Rating: " + rating + " out of 5</h5>");
		recipeDiv.append("<h5>Ingredients: " + ingredients + "</h5>");
		recipeDiv.append("<h3>____________________________</h3>")

		//Console log the for loop
		// console.log(recipeName);
		// console.log(ingredients);
		// console.log(cookTime);
		// console.log(flavors);
		// console.log(rating);
		// console.log(course);
		// console.log(cuisine);
		// console.log(imageUrl);
	
	}

	// Zomato API ajax call
	$.ajax({
    	datatype: "json" , 
    	url: "https://developers.zomato.com/api/v2.1/search?entity_id=601&entity_type=city&q=" + food + "&count=10&radius=2000",
   	    method: 'GET' , 
    	headers: {'user-key' : '6c23e886ba2a04e9caeef4ff77b522ac',},
     
	})
	.done(function(results) {

    	// console.log(results);

    // To save result
    var restaurants = results.restaurants;
    // console.log(results.restaurants);

    // To select div matching id
		var restaurantDiv = $("#leftContent");

    // For loop for restaurant array
	for (var j = 0; j < restaurants.length; j++) {
		var restaurantName = restaurants[j].restaurant.name;
		var address = restaurants[j].restaurant.location.address;
		var location = restaurants[j].restaurant.location.city;
		var zipcode = restaurants[j].restaurant.location.zipcode;
		var userRating = restaurants[j].restaurant.user_rating.aggregate_rating;
		var votes = restaurants[j].restaurant.user_rating.votes;
		var textRating = restaurants[j].restaurant.user_rating.rating_text;
		var menuUrl = restaurants[j].restaurant.menu_url;
		var menu = $("<a/>",{
			id: "menuRestaurant",
			href: menuUrl,
			text: "Menu",
			target: "_blank"
		})
	// Create new div for each of the restaurants
		var newRestaurantDiv = $("<div>" + restaurants[i] + "</div>");

	// Append results to leftContent
		restaurantDiv.append("<h4><strong><u>" + restaurantName + "</h4></strong></u>");
		restaurantDiv.append( menu );
		restaurantDiv.append("<h5>Address: " + address + "</h5>");
		restaurantDiv.append("<h5>Location: " + location + "</h5>");
		restaurantDiv.append("<h5>Zipcode: " + zipcode + "<h5>");
		restaurantDiv.append("<h5>Rating: " + userRating + " out of 5</h5>");
		restaurantDiv.append("<h5>Votes: " + votes + "</h5>");
		restaurantDiv.append("<h5> Comments: " + textRating + "</h5>");
		restaurantDiv.append("<h3>_____________________________</h3>")

	// Console log loop
		// console.log(restaurantName);
		// console.log(address);
		// console.log(location);
		// console.log(zipcode);
		// console.log(userRating);
		// console.log(votes);
		// console.log(textRating);
			
	}

	});

	});
	
		// Clearch the search textbox after user presses submit
		$("#food").val("");
		$("#location").val("");
		
		// Clear old results when entering new search
		$("#rightContent").empty();
		$("#leftContent").empty();
	};

	
	
