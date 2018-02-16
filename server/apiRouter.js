//region Base Setup=========================
const express = require('express');
const router = express.Router();
//endregion

//region Define Routes======================
const sensor = require('./sensor');
const heatMap = require('./heatMap');
const trends = require('./trends');
const admin = require('./admin');
//endregion

//region Routes=============================
router.get('/', (req, res) => {
  res.send('API route works!');
});
router.use('/sensor', sensor);
router.use('/heatMap', heatMap);
router.use('/trends', trends);
router.use('/admin', admin);
//endregion

module.exports = router;
