//region Model Imports======================
const Sensor = require('../../Models/Sensor');
//endregion

//region Function Definition================
function editSensor(req, res) {
  console.log("1");
  Sensor.findOne({
    "SensorID": req.body.SensorID
  }, (err, sensor) => {

    if (err) {
      console.log(err);
    } else {
      if (sensor) {
        if (req.body.SensorName) {
          sensor.SensorName = req.body.SensorName;
        }
        if (req.body.SensorLocation) {
          sensor.SensorLocation = req.body.SensorLocation;
        }
        if (req.body.SensorType) {
          sensor.SensorType = req.body.SensorType;
        }
        if (req.body.SensorCity) {
          sensor.SensorCity = req.body.SensorCity;
        }

        sensor.save((err) => {
          if (err) {
            console.log(err);
            res.json({
              "Message": "Error in transaction."
            });
          } else {
            res.json({
              "Message": "Sensor Edited."
            });
          }
        });

      } else {
        res.json({
          "Message": "Sensor not found."
        });
      }
    }

  });

}
//endregion

//region Exports==============
module.exports = editSensor;
//endregion
