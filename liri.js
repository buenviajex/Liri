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
    screen_name: 'cinemarkkk',
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
    

  
//     if  {
//         var songName = "";

//         for (var i = 3; i < process.argv.length; i++) {
//             if (i > 3 && i < process.argv.length) {
//                 songName = songName + "+" + process.argv[i];
//             } else {
//                 songName += process.argv[i];
//             }
//         }

        
//     }
// }


// 2. `node liri.js spotify-this-song '<song name here>'`


//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   



// function movieThis() {

//   var omdb = require('omdb');
//   // var movieName = "";

// 	var request = 'http://www.omdbapi.com/?t='+ movieName +'&plot=full';

// 	this.request(request, function (error, response, body) {
// 		if(error){
// 		  console.log('error:', error); // Print the error if one occurred 
// 		}else{
// 			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// 			// console.log(body); 
// 			var requestObject = JSON.parse(body);
// 			console.log('Movie Title: ', requestObject.Title );
// 			console.log('Movie imdbRating: ', requestObject.imdbRating);
// 			console.log('Movie Year: ', requestObject.Year);
// 			console.log('Movie Country: ', requestObject.Country);
// 			console.log('Movie Language: ', requestObject.Language);
// 			console.log('Movie Plot: ', requestObject.Plot);
// 			console.log('Movie Actors: ', requestObject.Actors);
// 			console.log('Movie RottenTotmatesRating: ', requestObject.Ratings[1].Source, requestObject.Ratings[1].Value);
// 			console.log('Movie Url: ', requestObject.Website); 
// 		}
// 	});

// };







// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
//      * It's on Netflix!
   
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.





// function doWhatItSays (){

// };






// 4. `node liri.js do-what-it-says`
   
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//      * Feel free to change the text in that document to test out the feature for other commands.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.
