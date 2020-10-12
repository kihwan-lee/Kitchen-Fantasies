const express = require('express');
const router = express.Router();

const db = require('../models');


//User Home Route 
router.get('/', (req, res) => {
  res.render('users');
});


router.get('/new', (req, res) => {
  res.render('users/new');
});

module.exports = router;
