// Add NPM modules
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const hbs = require('express-handlebars')

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

// Require router service
const userService = new UserService()
const restaurantService = new RestaurantService()
const blogService = new BlogService()
const commentService = new CommentService()
const reviewService = new ReviewService()

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
    res.render('index',{title:'Home'})
})

app.get('/restaurants/all', async (req,res)=>{
    let results = await restaurantService.listRestaurants()
    
    res.render('restaurant',{
        title:'restaurants-all',
        restaurants: {results, categories, pictures}
    })
})

//routing maps

app.get('/map', (req,res)=>{
    res.render('map', {title:'map'})
})

//hong kong island

app.get('/map/hong-kong-island/central', (req,res)=>{
    res.render('map',{title:'central',location: req.params.location})
})

app.get('/map/hong-kong-island/wan-chai', (req,res)=>{
    res.render('map',{title:'wan-chai',location: req.params.location})
})

app.get('/map/hong-kong-island/causeway-bay', (req,res)=>{
    res.render('map',{title:'causeway-bay',location: req.params.location})
})

app.get('/map/hong-kong-island/north-point', (req,res)=>{
    res.render('map',{title:'north-point',location: req.params.location})
})

//kowloon

app.get('/map//map/hong-kong-island/wan-chai', (req,res)=>{
    res.render('map',{title:'map',location: req.params.location})
})

app.get('/map//map/hong-kong-island/wan-chai', (req,res)=>{
    res.render('map',{title:'map',location: req.params.location})
})

app.get('/map//map/hong-kong-island/wan-chai', (req,res)=>{
    res.render('map',{title:'map',location: req.params.location})
})

//routing blogs

app.get('/blogs', (req,res)=>{
    res.render('blog',{title:'blog'})
})

app.get('/blogs/full_blog', (req,res)=>{
    res.render('full_blog',{title:'full_blog'})
})

//routing restaurant

app.get('/restaurant/details/summary',(req,res)=>{
    res.render('restaurant_details_summary',{title:'restaurant-details/summary'})
})
app.get('/restaurant/details/dishes',(req,res)=>{
    res.render('restaurant_details_dishes',{title:'restaurant-details/dishes'})
})
app.get('/restaurant/details/reviews',(req,res)=>{
    res.render('restaurant_details_reviews',{title:'restaurant-details/reviews'})
})

//routing users

app.get('/users/info',(req,res)=>{
    res.render('user_information',{title:'userInformation'})
})

app.get('/users/reviews',(req,res)=>{
    res.render('user_reviews',{title:'userReviews'})
})

app.get('/users/blogs',(req,res)=>{
    res.render('user_blogs',{title:'userBlogs'})
})

app.get('/users/restaurants',(req,res)=>{
    res.render('user_restaurants',{title:'userRestaurants'})
})

// Initialise passport
initPassport(app);

// Set up routers
app.use('/user', new UserRouter(userService).route());
app.use('/restaurant', new RestaurantRouter(restaurantService).route());
app.use('/blog', new BlogRouter(blogService).route());
app.use('/comment', new CommentRouter(commentService).route());
app.use('/review', new ReviewRouter(reviewService).route());
app.use('/auth', new AuthRouter().route());

// Set up server
server.listen(port);