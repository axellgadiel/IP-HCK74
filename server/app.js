if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authentication = require("./middleware/authentication");
const errorHandler = require("./middleware/error");
const UserController = require("./controllers/user");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.send("HELLOOO");
// });

//routing

app.post("/login", UserController.login);

console.log("adadada");

app.post("/register", UserController.register);

app.use(authentication);

app.get("/spotify-login", UserController.spotifyLogin);
app.post("/spotify-login", UserController.spotifyLoginPost);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server ready on http://localhost:" + port);
});
