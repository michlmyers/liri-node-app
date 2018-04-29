require("dotenv").config();

var keys = require("./keys.js");
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

switch (userInput) {
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

function tweetList() {
    var params = { screen_name: 'tunesdawg' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log('******************************TWEETS**********************************************************');
            for (var i = 0; i < tweets.length; i++) {
                var tweetResponse = tweets[i].created_at + '\n' + tweets[i].text;
                console.log(tweetResponse);
                logStuff(tweetResponse);
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
    if (!trackName) {
        trackName = 'i saw the sign';
    }
    spotify.search({ type: "track", query: trackName, limit: 1 }, function (err, data) {
        if (err) {
            console.log('error occurred: ' + err);
            return;
        }
        var apiData = data.tracks.items;
        var artistName = JSON.stringify(apiData[0].album.artists, ['name']);
        var spotifyResults =
            '******************************SONG**********************************************************' + '\n' +
            'Artist: ' + artistName +
            '\n' + 'Song: ' + apiData[0].name +
            '\n' + 'Preview link: ' + apiData[0].preview_url +
            '\n' + 'Album: ' + apiData[0].album.name +
            '\n' + '***********************END*******SONG**********************************************************';
        console.log(spotifyResults);
        logStuff(spotifyResults);
    }
    )
};

function movieNotes() {
    var movieName = process.argv[3];
    if (!movieName) {
        movieName = 'mr.nobody';
    }
    var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movieName;
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieItems = JSON.parse(body);
            var movieResults =
                '******************************MOVIE**********************************************************' + '\n' +
                'Your movie: ' + movieItems.Title + '\n' + 'Was released in: ' + movieItems.Year +
                '\n' + 'Has an IMDB rating of: ' + movieItems.Ratings[0].Value +
                '\n' + 'Has a Rotten Tomatoes rating of: ' + movieItems.Ratings[1].Value +
                '\n' + 'Was produced in: ' + movieItems.Country +
                '\n' + 'Is in the language of: ' + movieItems.Language +
                '\n' + 'This is the plot: ' + movieItems.Plot +
                '\n' + 'These are the actors in it: ' + movieItems.Actors +
                '\n' + '**********************************END***MOVIE****************************************************'
                ;
            console.log(movieResults);
            logStuff(movieResults);
        }
    });
}

function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log('whoops: ' + error);
        }
        var dataSplit = data.split(",");
        process.argv[3] = dataSplit[1];
        spotifyThisSong(dataSplit[1]);
    });
}

function logStuff(logOutput) {
    fs.appendFile('log.txt', logOutput, function (err) {
        if (err) {
            return consolelog('Log function did not work and data did not append');
        }
    });
}



