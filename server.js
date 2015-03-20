var express = require('express')
    , http = require('http')
    , bodyParser = require('body-parser')
    , twitter = require('twitter')
    , exphandlebars = require('express-handlebars')
    , db = require('./models/Db')
    , config = require('./config')
    , streamHandler = require('./utils/streamHandler')
    , indexController = require('./routes/index')
    , pageController = require('./routes/page');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.disable('etag');

 var router = express.Router();

router.route('/')
    .get(indexController.main);

router.route('/page/:page/:skip')
    .get(pageController.getPage);

app.use('/', router);
app.use("/", express.static(__dirname + "/public/"));


var server = http.createServer(app).listen(8089);
var socketio = require('socket.io').listen(server);

var twit = new twitter(config.twitter);

twit.stream('statuses/filter',{ track: 'javascript' }, function(stream){
    streamHandler(stream,socketio);
});