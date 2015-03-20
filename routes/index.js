var JSX = require('node-jsx').install()
    , React = require('react')
    , TweetsApp = require('../components/TweetsApp.react')
    , Tweet = require('../models/Tweet');

exports.main = function(req, res) {

    Tweet.getTweets(0, 0, function(tweets, pages) {

        var markup = React.renderComponentToString(
            TweetsApp({
                tweets: tweets
            })
        );

        res.render('home', {
            markup: markup,
            state: JSON.stringify(tweets)
        });

    });

};