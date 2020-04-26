const express = require('express');
const router = express.Router();

// Bring in data from data folder
const { providerData } = require('../../data/provider.json'); // provider credentials

router.get('/provider/login', (req, res) => { // TEST WITH: => http://localhost:3000/landing
    //res.send('To do: render login page');
    res.render('provider-login');
});
router.post('/provider/login', (req, res) => {
    // read in user input ---> compare to mongoDB --> if(match) { start session for user } 
    // --> redirect to res.redirect('/') route
});

module.exports = router;