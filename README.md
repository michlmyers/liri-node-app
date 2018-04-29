# liri-node-app
This is a language interpretation app that reads four different commands. I made this late April of 2018. 

### my-tweets
This command calls the Twitter api to return tweets from a dummy Twitter account I made. It also appends these results to a log file. 

### spotify-this-song
This command calls the Spotify api based on the song specified and returns some data on that song. It prints to the console and appends to a log file. If no song is specified it uses a song I specified. 

### movie-this
This command calls the OMDB api based on the movie specified and returns some data on that movie. It prints to the console and appends to a log file. If no movie is specified it uses a song I specified.

### do-what-it-says
This command reads text placed into the random file and interprets that as the command. In this case it will run the Spotify search with a song I specified in that file. 