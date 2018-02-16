//region Base Setup====================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('mongodb://airpol:airpol@ds239128.mlab.com:39128/researchshala');
//endregion

//region Schema Declaration============
var sensorDataSchema = new Schema({
  Time: Date,
  AQI: Number,
  SO2: Number,
  NO2: Number,
  CO2: Number,
  PM25: Number,
  PM10: Number,
  Humidity: Number,
  Temperature: Number
});
//endregion

//region Model======================
var SensorData = db.model('SensorData', sensorDataSchema);
//endregion

//region Module Exports================
module.exports = SensorData;
module.exports.sensorDataSchema = function () {
  return sensorDataSchema;
};
//endregion
