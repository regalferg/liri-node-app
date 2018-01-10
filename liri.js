var fs = require("fs");
var Twitter = require('twitter');
var twitkeys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var input = process.argv[2];
var value = process.argv[3];





function tweetDis() {

    var client = new Twitter(twitkeys);

    var params = {
        screen_name: 'regalfergdev',
        result_type: 'recent',
        count: 10
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweeted @: " + tweets[i].created_at);
                console.log("Tweet: " + tweets[i].text);

            }

        }
    });

}

function spotifyDis() {
    var spotify = new Spotify({
        id: '976b1c083ba748e4b5f03845eccb3b45',
        secret: '6a1c121516654c2ab9d05ee147239eab'
    });

    spotify.search({
        type: 'track',
        query: value,
        limit: 5
    }, function(err, data) {
        if (err) {
            value = 'Ace of Base'
            spotifyDis();
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });

}

function movieDis() {

    request('http://www.omdbapi.com/?apikey=trilogy&r=json&t=' + value, function(error, response, body) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year Released: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes:  " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    });

}

function doDis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        value = data;
        spotifyDis();
    });

}

switch (input) {
    case "my-tweets":
        tweetDis();
        break;

    case "spotify-this-song":
        spotifyDis();
        break;

    case "movie-this":
        movieDis();
        break;

    case "do-what-it-says":
        doDis();
        break;
}

console.log("#################### INSTRUCTIONS For Liri Bot #########################################");
console.log("For Recent Tweets Enter: node liri.js my-tweets");
console.log("For Spotify Music Search Enter: node liri.js spotify-this-song '<song name here>' ");
console.log("For Movie Search Enter: node liri.js movie-this '<movie name here>'");
console.log("To Fully Enslave Liri Enter: node liri.js do-what-it-says ");
console.log("#################### Results Below ####################################################");