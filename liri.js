require("dotenv").config();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var userInput = process.argv[2];

var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
})

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

switch (userInput){
    case 'my-tweets':
    tweetList();
    break;
    case 'movie-this':
    movieNotes();
    break;
    case 'spotify-this-song':
    spotifyThisSong();
    break;
    case 'do-what-it-says':
    doWhat();
    break;
}

function tweetList(){
    var params = { screen_name: 'tunesdawg' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log('******************************TWEETS**********************************************************');
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
            console.log('*********************************END******TWEETS*************************************************');
        } else {
            throw error
        }
    });
}

function spotifyThisSong(songName) {
    // var songName = process.argv[3];
    var trackName = process.argv[3];
    spotify.search({ type: "track", query: trackName, limit: 1 }, function (err, data) {
        if (err) {
            console.log('error occurred: ' + err);
            return;
        }
        var apiData = data.tracks.items;
        var artistName = JSON.stringify(apiData[0].album.artists, ['name']);
        console.log('******************************SONG**********************************************************');
        console.log('Artist: ' + artistName,
            '\nSong: ' + apiData[0].name, 
            '\nPreview link: ' + apiData[0].preview_url,
            '\nAlbum: ' + apiData[0].album.name),
            console.log('***********************END*******SONG**********************************************************');
    }
    )
};

function movieNotes(){
    var movieName = process.argv[3];
    if (!movieName) {
        movieName = 'mr.nobody';
    }
    var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movieName;
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('******************************MOVIE**********************************************************');
            var movieItems = JSON.parse(body);
            console.log('Your movie: ' + movieItems.Title, '\nWas released in: ' + movieItems.Year,
                '\nHas an IMDB rating of: ' + movieItems.Ratings[0].Value,
                '\nHas a Rotten Tomatoes rating of: ' + movieItems.Ratings[1].Value,
                '\nWas produced in: ' + movieItems.Country,
                '\nIs in the language of: ' + movieItems.Language,
                '\nThis is the plot: ' + movieItems.Plot,
                '\nThese are the actors in it: ' + movieItems.Actors,
                '\n**********************************END***MOVIE****************************************************'
            );
        }
    });
}

function doWhat(){
    console.log('dwsays being read');
}

