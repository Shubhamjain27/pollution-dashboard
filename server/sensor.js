//region Base Setup===========
const express = require('express');
const router = express.Router();
//endregion

//region Routes================
router.get('/', (req, res) => {
  res.send('Sensor route works');
});

router.post('/getSensorData', (req, res) => {
  require('./Routes/Sensor/getSensorData')(req, res);
});
//endregion

//region Exports==============
module.exports = router;
//endregion
