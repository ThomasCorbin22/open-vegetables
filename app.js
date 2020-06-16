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
const LocationRouter = require('./router/LocationRouter');

// Require router service
const UserService = require('./service/UserService');
const RestaurantService = require('./service/RestaurantService');
const BlogService = require('./service/BlogService');
const CommentService = require('./service/CommentService');
const ReviewService = require('./service/ReviewService');
const LocationService = require('./service/LocationService');

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
}, app);

// Set up middleware
app.engine('handlebars', hbs(
    {
        helpers: {
            inc: function (val) { return parseInt(val+1); },
        }
        , defaultLayout: 'main'
    }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
}));



app.get('/', async (req, res) => {
    let blogs = await blogService.listBlogs()
    res.render('index', { title: 'Home', blogs: blogs })
})

app.get('/restaurants/all', async (req, res) => {
    let results = await restaurantService.listRestaurants()
    console.log(results)
    res.render('restaurant', {
        title: 'restaurants-all',
        restaurants: results
    })
})

app.get('/blog/blogNumber:id', async (req, res) => {
    let blogs = await blogService.listBlogs();
    for (let blog of blogs) {
        if (blog.id == req.params.id) {
            let publisher = await userService.getUser(blog.user_id)
            let commentsBlog = await commentService.getComment(blog.id)
            let commentBlog = []
            for (let comment of commentsBlog) {
                let commentUser = await userService.getUser(comment.user_id)
                console.log(commentUser)
                comment.userName = commentUser[0].first_name
                comment.userImage = commentUser[0].profile_picture_URL
                commentBlog.push(comment)
            }
            blog.comments = commentBlog
            blog.userName = publisher[0].first_name
            blog.userImage = publisher[0].profile_picture_URL
            console.log(blog)
            res.render('blog_details', { title: `blog-details/${blog.title}`, blog: blog, comments: blog.comments })
        }
    }
})

app.get('/blogs', async (req, res) => {
    let blogs = await blogService.listBlogs()
    console.log(blogs)
    res.render('blog', { title: 'blogs', blogs: blogs })
})

app.get('/restaurant/details/restaNumber:id', async (req, res) => {
    let restaurants = await restaurantService.listRestaurants()

    for (let resta of restaurants) {
        if (resta.id == req.params.id) {
            let reviews = await reviewService.listReviews(resta.id)
            let user
            for (let review of reviews) {
                user = await userService.getUser(review.user_id)
                console.log(user[0])
                review.userName = user[0].first_name
                review.userImage = user[0].profile_picture_URL
            }

            console.log(reviews)
            console.log(resta)
            res.render(`restaurant_details_reviews`, { title: `restaurant-details/${resta.name}`, resta: resta, reviews: reviews })
        }
    }
})


app.get('/user/info/userNumber:id', async (req, res) => {
    let user = await userService.getUser(req.params.id)
    console.log(user[0])
    res.render('user_information', { title: 'userInformation', user: user[0], favorResta: user[0].restaurants })
})

app.get('/user/reviews/userNumber:id', async (req, res) => {
    let reviews = await reviewService.getReview(req.params.id)
    for (let review of reviews) {
        let restaurant = await restaurantService.getRestaurant(review.restaurant_id)
        console.log(restaurant)
        review.restaurant = restaurant[0]

    }
    console.log(reviews)
    res.render('user_reviews', { title: 'userReviews', reviews: reviews })
})

app.get('/user/blogs/userNumber:id', async (req, res) => {
    let user = await userService.getUser(req.params.id)
    let userOwnBlogs = user[0].blog_access
    let blogImg 
    for (let blog of userOwnBlogs){
         blogImg = await blogService.getPicture(blog.id)
         blog.blogImg = blogImg[0]
    }
    console.log(userOwnBlogs)

    res.render('user_blogs', { title: 'userBlogs', blogs: userOwnBlogs })
})

app.get('/user/restaurants/userNumber:id', async (req, res) => {
    let user = await userService.getUser(req.params.id)
    console.log(user[0].restaurant_access[0])
    res.render('user_restaurants', { title: 'userRestaurants', ownResta: user[0].restaurant_access })
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
app.use('/location', new AuthRouter().route());

// Set up server
server.listen(port);