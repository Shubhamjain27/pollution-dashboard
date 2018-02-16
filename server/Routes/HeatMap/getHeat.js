//region Model Imports======================
const Sensor = require('../../Models/Sensor');
var moment = require('moment');
//endregion
let result=[];

let momentTime=moment('13/02/2018 11:45:00', 'DD/MM/YYYY HH:mm:ss');
var time=new Date(momentTime);
//region Function Definition================
function getHeat(req, res) {

let val={};
console.log(time);
  Sensor.find({}, (err, sensors) => {
      rec(0,sensors);
      val.result=result;
    res.json(result);
  });
}

function rec(i, sensors){
    if(i<101){
    sensorData = sensors[i].SensorData.filter(sensorData => {
        if(sensorData.Time.getTime()==time.getTime()){
            sensorData.Name=sensors[i].SensorID;
            result.push(sensorData);
            console.log(sensorData);
          return sensorData;
        }
        
      }).pop();
      rec(i+1, sensors);
    }

}
//endregion

//region Exports==============
module.exports = getHeat;
//endregion
