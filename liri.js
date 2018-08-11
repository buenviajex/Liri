require('dotenv').config();
var fs = require('fs');
var request = require('request')
var keys = require('./keys.js');


//Make it so liri.js can take in one of the following commands:
// * `my-tweets`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

switch (action) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      spotifyThisSong();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    };

// 1. `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

function myTweets() {
  var Twitter = require('twitter');
  var client = new Twitter(keys.twitter);

  var params = { 
    screen_name: value,
    count: 20
  };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        console.log('Sorry, tweets are not working!');
      } else {
        for (var i = tweets.length-1; i > 0; i--) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at)
        console.log("===========");
        };
      };
      
    });
};  

function spotifyThisSong() { 
  var Spotify = require("node-spotify-api");
	var spotify = new Spotify(keys.spotify);

	var params = {
		type: 'track', 
		query: value, 
		limit: 1 
	};
	
	spotify.search (params, function (err, data) {
		if (err) {
			return console.log("Error searching for song: " + err);
		} else {
			//console.log(data);
			var track = data.tracks.items;
			console.log(
					"Song: " + track[0].name +
					"\nArtist: " + track[0].artists[0].name +
					"\nURL: " + track[0].preview_url +
					"\nAlbum: " + track[0].album.name
			)
		}
	})
};
    
function movieThis() {

  var omdb = require('omdb');
	var queryURL = 'http://www.omdbapi.com/?t='+ value +'&plot=short&apikey=trilogy';

	request(queryURL, function (error, response, body) {
		if(error){
		  console.log('There is an error:', error);
		} else {
			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// console.log(body); 
			var requestObject = JSON.parse(body);
			console.log(
				'Movie Title: ', requestObject.Title +
				'\nMovie Year: ', requestObject.Year +
				'\nMovie imdbRating: ', requestObject.imdbRating +
				'\nMovie Rating: ', requestObject.Ratings[1].Source, requestObject.Ratings[1].Value +
				'\nMovie Country: ', requestObject.Country +
				'\nMovie Language: ', requestObject.Language +
				'\nMovie Plot: ', requestObject.Plot+
				'\nMovie Actors: ', requestObject.Actors+
				'\nMovie Url: ', requestObject.Website
			)}
	});

};



//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     

   
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.





function doWhatItSays (){
	var fs = require('fs');

	fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
				console.log(error);
		} 
		var dataArr = data.split(",");
		var action = dataArr[0];
		var value = dataArr[1];
		
		if (action === "spotify-this-song") {
			var songValue = value.slice(1, -1);
			spotifyThisSong(songValue);
		} else if (action === "my-tweets") {
			var tweetValue = value.slice(1, -1);
			myTweets(tweetValue);
		} else if(action === "movie-this") {
			var movieValue = value.slice(1, -1);
			movieThis(movieValue);
		} 
	
		}
	})
}






// 4. `node liri.js do-what-it-says`
   
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//      * Feel free to change the text in that document to test out the feature for other commands.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.
