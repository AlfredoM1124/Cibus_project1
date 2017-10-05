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

	// Edamam API
	var queryURL = "https://api.edamam.com/search?q=" + food;
	
	// Create AJAX call for button being clicked //
	$.ajax({
		url: queryURL,
		method: "GET",
		headers: {"user-key" : "76cfee1bdefd0ffe94d080015296f7e1"}
		// headers: {'application keys' : '76cfee1bdefd0ffe94d080015296f7e1,},
	})
	
	// Function after data from AJAX comes back //
	.done(function(response) {
	console.log(response);

	// To save the response //
	var hits = response.hits;
	// console.log(params.length);
	
	// To select div matching id
		var recipeDiv = $("#rightContent");

	// Loop through Edamam api array
	for (var i = 0; i < hits.length; i++) {
		var recipeName = hits[i].recipe.label;
		var diet = hits[i].recipe.dietLabels;
		var ingredients = hits[i].recipe.ingredientLines;
		var allergies = hits[i].recipe.healthLabels;
		var servings = hits[i].recipe.yield;
		var recipeUrl = hits[i].recipe.url;
		var recipeSteps = $("<a/>",{
			id: "Steps",
			href: recipeUrl,
			text: "Recipe",
			target: "_blank"
		})
		var imageUrl = hits[i].recipe.image;
		var image = $("<img/>",{
			id: "recipeImage",
			src: imageUrl
		})

	// Create new div for each of the params
		var newRecipeDiv = $("<div>" + hits[i] + "</div>");

	// Append to rightContent
		recipeDiv.append("<h4><strong><u>" + recipeName + "</strong></u></h4");
		recipeDiv.append(image);
		recipeDiv.append("<h5><strong>Diet: </strong>" + diet + "</h5>");
		recipeDiv.append("<h5><strong>Allergy friendly: </strong>" + allergies + "</h5>");
		recipeDiv.append("<h5><strong>Servings: </strong>" + servings + "</h5>");
		recipeDiv.append("<h5><strong>Ingredients: </strong>" + ingredients + "</h5>");
		recipeDiv.append("<h5><i>Click below for step by step recipe:</i></h5>");
		recipeDiv.append(recipeSteps);		

		//Console log the for loop
		// console.log(recipeName);
		// console.log(diet);
		// console.log(allergies);
		// console.log(servings);
		// console.log(ingredients);
			
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
		restaurantDiv.append(menu);
		restaurantDiv.append("<h5>Addres: " + address + "</h5>");
		restaurantDiv.append("<h5>Location: " + location + "</h5>");
		restaurantDiv.append("<h5>Zipcode: " + zipcode + "<h5>");
		restaurantDiv.append("<h5>Rating (0/5): " + userRating + "</h5>");
		restaurantDiv.append("<h5>Votes: " + votes + "</h5>");
		restaurantDiv.append("<h5> Comments: " + textRating + "</h5>");

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

	
	
