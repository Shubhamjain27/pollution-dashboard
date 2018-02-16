//region Model Imports======================
const Sensor = require('../../Models/Sensor');
//endregion

//region Function Definition================
function newSensor(req, res) {

  var newSensor = new Sensor({
    SensorID: req.body.SensorID,
    SensorName: req.body.SensorName,
    SensorLocation: req.body.SensorLocation,
    SensorCity: req.body.SensorCity,
    SensorType: req.body.SensorType,
    SensorData: []
  });
  newSensor.save((err) => {
    if (err) {
      console.log(err);
      res.json({'Error':'Check your query.'});
    } else {
      res.json({
        "Message": "Sensor Added!"
      });
    }
  });
}
//endregion

//region Exports==============
module.exports = newSensor;
//endregion
