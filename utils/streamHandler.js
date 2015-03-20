var Tweet = require('../models/Tweet');

module.exports = function(stream, socketio) {

    stream.on('data', function(data) {

        var tweet = {
            id: data['id'],
            body: data['text'],
            author: data['user']['name'],
            screenname: data['user']['screen_name'],
            avatar: data['user']['profile_image_url'],
            date: data['created_at'],
            active: false
        };

        var tweetEntry = new Tweet(tweet);

        tweetEntry.save(function(err) {
            if (!err) {
                console.log("[add]: " + tweet.id);
                socketio.emit('tweet', tweet);
            }
        });

    });

    stream.on('error', function(err) {
       console.log("[err]: " + err);
    });

};