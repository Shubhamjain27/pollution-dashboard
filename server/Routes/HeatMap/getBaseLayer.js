//region Model Imports======================
var fs = require('fs');
//endregion

//region Function Definition================
function getBaseLayer(req, res) {

  fs.readFile('./server/Assets/bangalore.geojson','utf-8', (err, data) => {
    if(err){
      console.log(err);
    }
    res.json(data);
  });
}
//endregion

//region Exports==============
module.exports = getBaseLayer;
//endregion
