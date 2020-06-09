// Add NPM modules
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const hbs = require('express-handlebars')
// Specify public directory
const publicDirectory = __dirname + '/public'

// Require router modules
const UserRouter = require('./router/UserRouter');
const RestaurantRouter = require('./router/RestaurantRouter');
const BlogRouter = require('./router/BlogRouter');
const CommentRouter = require('./router/CommentRouter');
const ReviewRouter = require('./router/ReviewRouter');
const AuthRouter = require('./router/AuthRouter');

// Require router service
const UserService = require('./service/UserService');
const RestaurantService = require('./service/RestaurantService');
const BlogService = require('./service/BlogService');
const CommentService = require('./service/CommentService');
const ReviewService = require('./service/ReviewService');

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
app.engine('handlebars',hbs({defaultLayout:'main'}))
app.set('view engine','handlebars')
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
}));

app.get('/',(req,res)=>{
    res.render('test',{title:'Home'})
})

app.get('/restaurants/All',(req,res)=>{
    res.render('restaurant',{title:'Restaurants-All'})
})

app.get('/user/info',(req,res)=>{
    res.render('user_information',{title:'userInformation'})
})

app.get('/user/reviews',(req,res)=>{
    res.render('user_reviews',{title:'userReviews'})
})

app.get('/user/blogs',(req,res)=>{
    res.render('user_blogs',{title:'userBlogs'})
})

app.get('/user/restaurants',(req,res)=>{
    res.render('user_restaurants',{title:'userRestaurants'})
})

// Initialise passport
initPassport(app);

// Send index page
app.get('/', (req, res) => {
    res.sendFile(publicDirectory + '/index.html');
});

// Set up routers
app.use('/user', new UserRouter(new UserService()).route());
app.use('/restaurant', new RestaurantRouter(new RestaurantService()).route());
app.use('/blog', new BlogRouter(new BlogService()).route());
app.use('/comment', new CommentRouter(new CommentService()).route());
app.use('/review', new ReviewRouter(new ReviewService()).route());
app.use('/auth', new AuthRouter().route());

// Set up server
server.listen(port);