// Add NPM modules
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');

// Specify public directory
const publicDirectory = __dirname + '/public'

// Require router modules
const userRouter = require('./router/UserRouter')(express, publicDirectory);
const restaurantRouter = require('./router/RestaurantRouter')(express, publicDirectory);
const blogRouter = require('./router/BlogRouter')(express, publicDirectory);
const authRouter = require('./router/AuthRouter')(express, publicDirectory);

// Require passport initialisation
const initPassport = require('./passport/init-passport');

// Specify port
const port = process.env.PORT || 8080;

// Create HTTPS server
const server = https.createServer({
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
},app);

// Set up middleware
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
}));

// Initialise passport
initPassport(app);

// Send index page
router.get('/', (req, res) => {
    res.sendFile(publicDirectory + '/index.html');
});

// Set up routers
app.use('/user', userRouter);
app.use('/restaurant', restaurantRouter);
app.use('/blog', blogRouter);
app.use('/auth', authRouter);

// Set up server
server.listen(port);