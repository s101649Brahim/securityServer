const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var originsWhitelist = ["https://heuristic-leakey-258632.netlify.com"];

var corsOptions = {
  origin: function(origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};

app.use(cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://softwaresecure.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://your-api-gateway",
  issuer: "https://softwaresecure.eu.auth0.com/",
  algorithms: ["RS256"]
});

app.use(jwtCheck);

app.listen(port, () => console.log("listening on " + port));

//**student code change start**
app.get("/", (req, res) => {
  const namen = [
    { firstName: "Brahim", lastName: "Amezian" },
    { firstName: "Naseyb", lastName: "Yaramis" }
  ];
  res.json(namen);
});
//**student code change end**
