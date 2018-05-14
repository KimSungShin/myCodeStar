const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let router = require('./lib/router');
let config = require('config');
const cors = require('cors');

const index = require('./routes/index');
const app = express();

let moment = require('moment');

const history = require('./api/history');


console.log('================================================');
console.log(' Start iFriendsPet Server                       ');
console.log(' * NODE_ENV    : %s'           ,process.env.NODE_ENV);
console.log(' * config Name : %s'           ,config.get('name'));
console.log('================================================');


const morganSkip = ( req, res )=>{
    return config.get('morgan.skip');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

logger.token('date', function(){
    return  new Date() ;
});

let originsWhitelist = config.get('cors.allow-origin') || []

console.log(` originsWhitelist=${JSON.stringify(originsWhitelist)} `)


var corsOptions = {
	origin: function(origin, callback){

		var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;

		console.log('!!!! originsWhitelist===>'+JSON.stringify(originsWhitelist))
		console.log('!!!! origin===>'+origin)
		console.log('!!!! isWhitelisted===>'+isWhitelisted)

		callback(null, isWhitelisted);
	},
	credentials:true
}

app.use( cors(corsOptions) );




app.use( logger( config.get('morgan.format') , { skip: morganSkip } ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/public', express.static(path.join(__dirname, 'public')));




app.use('/', index);

app.use( history );

//--- router define --//
router( app );


// catch 404 and forward to error handler
app.use( function(req, res, next ) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

