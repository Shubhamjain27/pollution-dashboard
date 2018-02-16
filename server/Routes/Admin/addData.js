//region Model Imports======================
const Sensor = require('../../Models/Sensor');
const SensorData = require('../../Models/SensorData');
//endregion

//region Function Definition================
function addData(req, res) {

  var newSensorData = new SensorData({
    Time: req.body.Time,
    AQI: req.body.AQI,
    N02: req.body.NO2,
    CO2: req.body.CO2,
    SO2: req.body.SO2,
    PM25: req.body.PM25,
    PM10: req.body.PM10,
    Humidity: req.body.Humidity,
    Temperature: req.body.Temperature
  });

  Sensor.update({
    "SensorID": req.body.SensorID
  }, {
    $push: {
      SensorData: newSensorData
    }
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        "Message": "Sensor data added."
      });
    }
  });
}
//endregion

//region Exports==============
module.exports = addData;
//endregion
