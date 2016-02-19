const express = require('express');
const path = require('path');
// const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

const db = require('./db/index');

const CLIENT_ID = "10589206992.22131652337"
const CLIENT_SECRET = "63a441c7c9d19dcd6faa789d27a22d3a";


passport.serializeUser(function(user, done) {
  console.log('serialized: ', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialized: ', user);
  db.User.find({where: {id: user.id}}).success(function(user) {
    done(null, user);
  }).error(function(err) {
    done(err, null);
  });
});

passport.use(new SlackStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: '/auth/slack/callback',
  scope: 'incoming-webhook users:read',
},
  (accessToken, refreshToken, profile, done) => {
    const slackId = profile.id;
    const firstName = profile._json.info.user.profile.first_name;
    const lastName = profile._json.info.user.profile.last_name;
    const slackTeam = profile._json.team_id;
    const teamName = profile._json.team;

    db.User.findOrCreate({where: {slackId, firstName, lastName}})
      .spread((user, userCreated) => {
        db.Team.findOrCreate({where: {slackTeam, teamName}}).spread((team, teamCreated) => {
          if (!userCreated && !teamCreated) { //TODO: ADDRESS EDGE CASE
            console.log('Team and user exist already');
          } else {
            console.log('User and team connected');
            return user.addTeam(team);
          }
        }).then(() => {
          console.log('Returning user info for serialization');
          return done(null, user);
        });
      });
}));

const app = express()

app.use(session({secret:'asdfqwertty'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../static')));
app.use('/build', express.static(path.join(__dirname, '../build')));

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/slack');
  }
};

app.get('/api/destinations', (req, res) => {
  //make database query
  const sqlData = [{
    id: 1,
    googleId: 'geruihagubgi242t616',
    destinationName: 'Train Cafe',
    lat: 37.781208,
    long: -122.406514,
    visit: 1,
    likes: 1,
  },
  {
    id: 2,
    google_id: 'rrehgiuhgr48398649233',
    destinationName: 'Coffee Cafe',
    lat: 37.36725,
    long: -122.4523,
  }];
  
  //make ajax request to google api and format data
  const ajaxData = [{
    id: '43186941368913fgdsognrfshbdb',
    name: 'Off Da Rails Cafe',
    lat: 37.783697,
    long: -122.408966,
  }];
  
  res.send([sqlData.concat(ajaxData)]);
});

app.get('/api/trains', (req, res) => {
  // 12:30 PM - 1:30 PM
  const trains = [{
    trainId: 1,
    stationId: 1,
    conductor: {id: 3, name: 'Griffin'},
    destinationName: 'Train Cafe',
    passengers: [{id: 1, name: 'Bobby'}, {id: 2, name: 'Batman'}],
    timeDeparting: 1455827400,
    timeBack: 1455787800,
    timeDuration: 39600,
  },
  // 1:30 PM - 2:30 PM
  {
    trainId: 2,
    stationId: 1,
    conductor: {id: 1, name: 'Bobby'},
    destinationName: 'Coffee Cafe',
    passengers: [{id: 3, name: 'Griffin'}, {id: 2, name: 'Batman'}],
    timeDeparting: 1455787800,
    timeBack: 1455791400,
    timeDuration: 39600,
  }]
  res.send(trains);
});


app.get('/', ensureAuthenticated,
function(req, res) {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/trains', ensureAuthenticated,
function(req, res) {
  res.render('trains');
});

app.get('/destinations', ensureAuthenticated,
function(req, res) {
  res.render('destinations');
});

app.get('/logout',
function(req, res) {
  req.logout();
  res.redirect('/auth/slack');
});

app.get('/auth/slack',
  passport.authorize('slack'));

app.get('/auth/slack/callback',
  passport.authorize('slack', {failureRedirect: '/login'}),
  function(req, res) {
    console.log('test');
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);


// app.post('/trains', ensureAuthenticated,
//   // Find user
//   db.User.findOne()
//   function(req, res) {
//     // Create train entry for user
//       db.Train.create({
//       conductorId: conductorId,
//       destinationId: destinationId,
//       timeDeparting: timeDeparting,
//       timeDuration: timeDuration,
//     }).then((user) => {
//     }
//   });

// app.post('/destinations', ensureAuthenticated,
//   function(req, res) {
//     // Create destination table
//     db.Destination.create({
//       google_id: google_id,
//       name: name,
//       lat: lat,
//       long: long,
//       visits: visits,
//       likes: likes,
//     })
//   });

console.log('Server is listening on port 8000');
app.listen(8000);
