require("dotenv").config();
//#libaries importing
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const session = require("client-sessions");
const cors = require("cors");

//#routes importing
const auth = require("./routes/auth");
const user = require("./routes/user");
const recipes = require("./routes/recipes");

//#app setting and config
var app = express();
const port = process.env.PORT || "3000";
//#parse application /x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//#parse application/json
app.use(bodyParser.json());
//#print request log
app.use(morgan(":method :url  :status   :response-time ms"));
//#setting cors
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
//#setting cookies configuration
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 30 * 60 * 1000, // expired after 30 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: false,
      // ephemeral: true, //when true, cookie expires when the browser closes
    },
  })
);
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

app.get("/", (req, res) => res.send("welcome"));

//#Routing
app.use("/user", user);
app.use("/recipes", recipes);
app.use(auth);

//#default
app.use((req, res) => {
  res.sendStatus(404);
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
