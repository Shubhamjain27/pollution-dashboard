//region Base Setup====================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('mongodb://airpol:airpol@ds239128.mlab.com:39128/researchshala');
//endregion

//region Schema Declaration============
var locationSchema = new Schema({
  Latitude: Number,
  Longitude: Number
});
//endregion

//region Model======================
var Location = db.model('SensorData', locationSchema);
//endregion

//region Module Exports================
module.exports = Location;
module.exports.locationSchema = function () {
  return locationSchema;
};
//endregion
