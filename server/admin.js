//region Base Setup===========
const express = require('express');
const router = express.Router();
//endregion

//region Routes================
router.get('/', (req, res) => {
  res.send('Admin route works');
});

router.post('/newSensor', (req, res) => {
  require('./Routes/Admin/newSensor')(req, res);
});

router.put('/addData', (req, res) => {
  require('./Routes/Admin/addData')(req, res);
});

router.delete('/removeSensor', (req, res) => {
  require('./Routes/Admin/removeSensor')(req, res);
});

router.put('/editSensor', (req, res) => {
  require('./Routes/Admin/editSensor')(req, res);
});
//endregion

//region Exports==============
module.exports = router;
//endregion
