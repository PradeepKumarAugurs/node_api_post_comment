const express = require('express');
const initPostRoutes = require('./routes/post');
const initUserRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const session = require('express-session');
let app = express();
let port = 8000;



app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

initUserRoutes(app);
initPostRoutes(app);


app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));
