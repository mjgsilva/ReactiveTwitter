var Tweet = require('./models/tweet');

exports.getPage = function(req, res) {

    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

        res.send(tweets)

    })

};