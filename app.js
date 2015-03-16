var express = require('express')
    , http = require('http')
    , bodyParser = require('body-parser')
    , ntwitter = require('ntwitter')
    , socketio = require('socketio')
    , exphandlebars = require('express-handlebars')
    , config = require('./config')
    , db = require('./models/db')
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

var server = http.createServer(app).listen(3545);
socketio.listen(server);
