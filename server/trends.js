//region Base Setup===========
const express = require('express');
const router = express.Router();
//endregion

//region Routes================
router.get('/', (req, res) => {
  res.send('Trends route works');
});

router.post('/mostPolutedTime', (req, res) => {
  require('./Trends/mostPolutedTime')(req, res);
});

router.get('/cleanestCity', (req, res) => {
  require('./Trends/cleanestCity')(req, res);
});

router.post('/getData', (req, res) => {
  require('./Trends/getData')(req, res);
});
//endregion

//region Exports==============
module.exports = router;
//endregion