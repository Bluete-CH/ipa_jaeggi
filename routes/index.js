const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Julia Jäggi\'s IPA 2023',
    description: 'Implementation des Backends eines Parkplatzreservationssystems.',
    link: 'https://github.com/Bluete-CH/ipa_jaeggi',
  });
});

module.exports = router;
