// Add NPM modules
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const https = require("https");
const hbs = require("express-handlebars");

// Custom module
const getDate = require("./modules/getDate.js");

// Set up connection to postgres database via knex
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Require router modules
const UserRouter = require("./router/UserRouter");
const RestaurantRouter = require("./router/RestaurantRouter");
const BlogRouter = require("./router/BlogRouter");
const CommentRouter = require("./router/CommentRouter");
const ReviewRouter = require("./router/ReviewRouter");
const AuthRouter = require("./router/AuthRouter");
const LocationRouter = require("./router/LocationRouter");

// Require router service
const UserService = require("./service/UserService");
const RestaurantService = require("./service/RestaurantService");
const BlogService = require("./service/BlogService");
const CommentService = require("./service/CommentService");
const ReviewService = require("./service/ReviewService");
const LocationService = require("./service/LocationService");

// Require router service
const userService = new UserService(knex);
const restaurantService = new RestaurantService(knex);
const blogService = new BlogService(knex);
const commentService = new CommentService(knex);
const reviewService = new ReviewService(knex);
const locationService = new LocationService(knex);

// Require passport initialisation
const initPassport = require("./passport/init-passport");

// Specify port
const port = process.env.PORT || 8080;

// Create HTTPS server
const server = https.createServer(
  {
    cert: fs.readFileSync("./localhost.crt"),
    key: fs.readFileSync("./localhost.key"),
  },
  app
);

// Set up middleware
app.engine(
  "handlebars",
  hbs({
    helpers: {
      inc: function (val) {
        return parseInt(val + 1);
      },
      isdisabled: function (input) {
        return typeof input == "string";
      },
    },
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Homepage

app.get("/", async (req, res) => {
  let blogs = await blogService.listBlogs();
  let restaurants = await restaurantService.listRestaurants();

  for (let blog of blogs) {
    blog.date_modified = getDate(blog.date_modified).split(" ").splice(-1)[0];
  }

  blogs = blogs.filter((blog) => blog.main_picture_URL);
  restaurants = restaurants.filter(
    (restaurant) => restaurant.main_picture_URL !== "Not available"
  );

  res.render("index", {
    title: "Home",
    blogs: blogs.slice(0, 4),
    carousel: restaurants.slice(0, 3),
    thumbnails: restaurants.slice(3, 7),
  });
});

// Initialise passport
initPassport(app);

// Set up routers
app.use(
  "/user",
  new UserRouter(
    userService,
    blogService,
    locationService,
    restaurantService,
    reviewService
  ).route()
);
app.use(
  "/restaurant",
  new RestaurantRouter(
    restaurantService,
    reviewService,
    userService,
    locationService
  ).route()
);
app.use(
  "/blog",
  new BlogRouter(blogService, commentService, userService).route()
);
app.use("/comment", new CommentRouter(commentService).route());
app.use("/review", new ReviewRouter(reviewService).route());
app.use("/auth", new AuthRouter().route());
app.use("/location", new LocationRouter(locationService).route());

// Set up server
server.listen(port);
