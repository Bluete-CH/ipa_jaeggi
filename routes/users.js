const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/users', (req, res) => {
  // todo: get users from mysql
  const json = [
    {
      id: 'jdoe',
      name: 'John Doe',
    },
  ];
  res.send(json);
});

module.exports = router;
