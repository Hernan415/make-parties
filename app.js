const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Initialize express
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const jwtExpress = require('express-jwt');


// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// require handlebars
const exphbs = require('express-handlebars');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');


app.use(jwtExpress({
    secret: "AUTH-SECRET,
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.cookies.mpJWT) {
        req.session.returnTo = null;
        return req.cookies.mpJWT;
      }
      return null;
    }
  }).unless({ path: ['/', '/login', '/sign-up'] })
);

app.use(req, res, next => {
  // if a valid JWT token is present
  if (req.user) {
    // Look up the user's record
    User.findByPk(req.user.id, (currentUser) => {
      // make the user object available in all controllers and templates
      res.locals.currentUser = currentUser;
    });
  };
});
// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

const models = require('./db/models');

require('./controllers/events')(app, models);

require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);


// OUR MOCK ARRAY OF PROJECTS
var events = [
  { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]
// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
