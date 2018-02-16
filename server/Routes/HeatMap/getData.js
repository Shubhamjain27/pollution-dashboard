//region Model Imports======================
var fs = require('fs');
//endregion

//region Function Definition================
function getData(req, res) {

  fs.readFile('./server/Assets/first.geojson','utf-8', (err, data) => {
    if(err){
      console.log(err);
    }
    res.json(data);
  });
}
//endregion

//region Exports==============
module.exports = getData;
//endregion
