var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({
      id: { type: String, required: true }
    , body: { type: String, required: true }
    , author: { type: String, required: true }
    , screenname: { type: String, required: true }
    , avatar: { type: String, required: true }
    , date : { type: Date, required: true }
    , active: { type: Boolean, required: true }
});

TweetSchema.statics.getTweets = function(page, skip, callback) {
    var tweets = [],
        start = (page * 10) + (skip * 1);

    this.find({},'id body author screenname avatar date active', { skip: start, limit: 10 }).sort({ date: 'desc' }).exec(function(err,docs){
       if(!err) {
           tweets = docs;
           tweets.forEach(function(tweet){
               tweet.active = true;
           });
       }
        callback(tweets);
    });
};

module.exports = mongoose.model('Tweet', TweetSchema);
