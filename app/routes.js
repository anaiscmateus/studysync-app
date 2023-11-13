module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // HOME PAGE W/ LOGIN LINKS
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // dashboard SECTION =========================
    app.get('/dashboard', isLoggedIn, function(req, res) {
        db.collection('notes').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('dashboard.ejs', {
            user : req.user,
            notes: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// RECIPE BLOG ROUTES ===============================================================
    app.post('/add', (req, res) => {
      db.collection('notes').save({noteTitle: req.body.noteTitle, notes: req.body.notes, date: new Date().toDateString()}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/dashboard')
      })
    })

    app.delete('/dashboard', (req, res) => {
      db.collection('notes').findOneAndDelete({date: req.body.date, noteTitle: req.body.noteTitle, notes: req.body.notes}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('notes deleted!')
      })
    })

    app.put('/update', (req, res) => {
      const { oldTitle, oldNotes, newNoteTitle, newNotes } = req.body;
    
      // Filter: Find the note with the oldTitle and oldNotes
      const filter = { noteTitle: oldTitle, notes: oldNotes };
    
      // Update: Set the newNoteTitle and newNotes
      const update = { $set: { noteTitle: newNoteTitle, notes: newNotes } };
    
      // Options: Set the returnOriginal option to false to get the updated document
      const options = { returnOriginal: false };
    
      // Perform the update
      db.collection('notes').findOneAndUpdate(filter, update, options, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
    
        if (!result.value) {
          // If the note with oldTitle and oldNotes is not found
          return res.status(404).send('Note not found');
        }
    
        res.send('Note updated successfully');
      });
    });
    

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure dashboard section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure dashboard section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
