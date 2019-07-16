require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const swagController = require("./controllers/swagController");
const {login, register, signout, getUser} = require('./controllers/authController');
const searchController = require("./controllers/searchController");

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagController.read);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.get('/api/user', getUser);
app.get('/api/search', searchController.search);

app.listen(SERVER_PORT, () => {
    console.log(`Ready, set, ${SERVER_PORT}!🏎`)
});