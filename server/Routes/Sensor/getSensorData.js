//region Model Imports======================
const Sensor = require('../../Models/Sensor');
const closestSensor = require('../../Shared/closestSensor');
//endregion

//region Function Definition================
function getSensorData(req, res) {
  var SensorID;
  var startTime = (new Date(req.body.StartTime)).getTime();
  var endTime = (new Date(req.body.EndTime)).getTime();
  if (req.body.SensorID) {
    SensorID = req.body.SensorID;
  } else {
    SensorID = closestSensor(req.body.Location);
  }
  Sensor.findOne({
    SensorID: SensorID
  }, (err, sensor) => {
    sensorData = sensor.SensorData.filter(sensorData => {
      if (sensorData.Time.getTime() >= startTime && sensorData.Time.getTime() <= endTime) {

        return sensorData;
      }
    });

    res.send(sensorData);

  });
}
//endregion

//region Exports==============
module.exports = getSensorData;
//endregion
