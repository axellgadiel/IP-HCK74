if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authentication = require("./middleware/authentication");
const authorization = require("./middleware/authorization");
const errorHandler = require("./middleware/error");
const UserController = require("./controllers/user");
const ApiController = require("./controllers/api");
const { auth } = require("google-auth-library");

const app = express();
const port = 3001;
console.log(process.env.NODE_ENV || "development");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//routing

app.post("/google-login", UserController.googleLogin);

// app.use(authentication);

app.post("/api/generate", ApiController.fluxAi);
app.post("/api-g/generate", ApiController.geminiAi);

app.get("/user-profile/:id", UserController.userProfile);

app.put("/user-profile/:id", UserController.editProfile);

app.delete("/user-profile/:id", UserController.deleteProfile);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server ready on http://localhost:" + port);
});
