// NEW
app.get('/events/:eventId/rsvps/new', (req, res) => {
  models.Event.findByPk(req.params.eventId).then(event => {
    res.render('rsvps-new', { event: event });
  });
});
// LOGIN (POST)
router.post('/login', (req, res, next) => {
  // look up user with email
  User.findOne({ email: req.body.email }).then(user => {
    // compare passwords
    user.comparePassword(req.body.password, function (err, isMatch) {
      // if not match send back to login
      if (!isMatch) {
        return res.redirect('/login');
      }
      // if is match generate JWT
      const mpJWT = generateJWT(user);
      // save jwt as cookie
      res.cookie("mpJWT", mpJWT)

      res.redirect('/')
    })
    .catch(err => {
      // if  can't find user return to login
      console.log(err)
      return res.redirect('/login');
    });
  });
});

// LOGOUT
router.get('/logout', (req, res, next) => {
  res.clearCookie('mpJWT');

  req.session.sessionFlash = { type: 'success', message: 'Successfully logged out!' }
  return res.redirect('/');
});

// auth.js controller
const jwt = require('jsonwebtoken');

function generateJWT(user) {
  const mpJWT = jwt.sign({ id: user._id, currentOrgId: user.orgs[0]._id }, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

  return mpJWT
}
// after creating the user
const mpJWT = generateJWT(user)

// save as cookie
res.cookie("mpJWT", mpJWT)

// redirect to the root route
res.redirect('/')
