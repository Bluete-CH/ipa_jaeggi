var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Julia Jäggi\'s IPA 2023',
    description: 'Implementation des Backends eines Parkplatzreservationssystems.',
    link: 'https://github.com/Bluete-CH/ipa_jaeggi',
   });
});

module.exports = router;
