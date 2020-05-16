const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("./auth/passport");

const followersRouter = require("./routes/followers");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");
const authRouter = require("./routes/auth");
var recipesRouter = require("./routes/recipes");
var ingredientsRouter = require("./routes/ingredients");
var hashtagsRouter = require("./routes/hashtags");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("NOT_A_GOOD_SECRET"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "NOT_A_GOOD_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/hashtags", hashtagsRouter);
app.use("/api/followers", followersRouter);

module.exports = app;
