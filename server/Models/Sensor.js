//region Base Setup====================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('mongodb://airpol:airpol@ds239128.mlab.com:39128/researchshala');
//endregion

//region Imports===============
const SensorData = require('./SensorData');
const Location = require('./Location');
//endregion

//region Schema Declaration============
const sensorSchema = new Schema({
  SensorID: {type:String, unique: true},
  SensorName: String,
  SensorLocation: new Location.locationSchema,
  SensorCity: String,
  SensorType: Number,
  SensorData: [new SensorData.sensorDataSchema]
});
//endregion

//region Model======================
const Sensor = db.model('Sensor', sensorSchema);
//endregion

//region Module Exports================
module.exports = Sensor;
module.exports.sensorDataSchema = () => sensorSchema;
//endregion
