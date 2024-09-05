if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authentication = require("./middleware/authentication");
const errorHandler = require("./middleware/error");
const UserController = require("./controllers/user");
const ApiController = require("./controllers/api");

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

// app.use(authentication);

app.post("/api/generate", ApiController.fluxAi);
app.post("/api-g/generate", ApiController.geminiAi);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server ready on http://localhost:" + port);
});
