//region Model Imports======================
const Sensor = require('../../Models/Sensor');
//endregion

//region Function Definition================
function removeSensor(req, res) {

  Sensor.remove({
    "SensorID": req.query.SensorID
  }, (err) => {

    if (err) {
      console.log(err);
    } else {
      res.json({
        "Message": "Sensor removed."
      });
    }
  });
}
//endregion

//region Exports==============
module.exports = removeSensor;
//endregion
