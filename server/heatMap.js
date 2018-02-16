//region Base Setup===========
const express = require('express');
const router = express.Router();
//endregion

//region Routes================
router.get('/', (req, res) => {
  res.send('HeatMap route works');
});

router.post('/getData', (req, res) => {
  require('./Routes/HeatMap/getData')(req, res);
});

router.post('/getBaseLayer', (req, res) => {
  require('./Routes/HeatMap/getBaseLayer')(req, res);
});

router.get('/getHeat', (req, res) => {
  require('./Routes/HeatMap/getHeat')(req, res);
})
//endregion

//region Exports==============
module.exports = router;
//endregion
