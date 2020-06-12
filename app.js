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

app.get('/blogs',(req,res)=>{
    res.render('blog',{title:'Blogs'})
})

app.get('/blogs/full-blog',(req,res)=>{
    res.render('full_blog',{title:'blogs/full-blog'})
})


app.get('/map',(req,res)=>{
    res.render('map',{title:'maps'})
})

app.get('/restaurant/details/summary',(req,res)=>{
    res.render('restaurant_details_summary',{title:'restaurant-details/summary'})
})
app.get('/restaurant/details/dishes',(req,res)=>{
    res.render('restaurant_details_dishes',{title:'restaurant-details/dishes'})
})
app.get('/restaurant/details/reviews',(req,res)=>{
    res.render('restaurant_details_reviews',{title:'restaurant-details/reviews'})
})

app.get('/users/info',(req,res)=>{
    res.render('user_information',{title:'userInformation'})
})

app.get('/users/reviews',(req,res)=>{
    res.render('user_reviews',{title:'userReviews'})
})

app.get('/users/blogs',async(req,res)=>{
    let blogs = await blogService.listBlogs()
    console.log(blogs)
    let item =[]
    for (let blog of blogs){
        let categories = await blogService.listCategories(blog.id)
        let pictures = await blogService.listPictures(blog.id)
        let user = await blogService.list
        console.log(categories)
        let blog_categories = []

        for (let category of categories){
            blog_categories.push(category.category)
        }

        let item_pictures = []

        for (let anotherthing of pictures){
            item_pictures.push(anotherthing.picture_URL)
        }

        item['categories'] = blog_categories;
        item['picture_URLs'] = item_pictures;
        console.log(item)
    }

    res.render('user_blogs',{title:'userBlogs'})
})

app.get('/users/restaurants',(req,res)=>{
    res.render('user_restaurants',{title:'userRestaurants'})
})
app.get('/blogs',async(req,res)=>{
    let results = await blogService.listBlogs()

    res.render('blog',{title:'blog',blogs:results})
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