var xls = require('excel');
list = {sensors:[{sensorID:'12341.0', Date}]};

xls('AirPol.xlsx', function (err, data) {
  if (err) throw err;
  console.log(data[1][0]);
  for (var object of data) {
      if(object[0]!=''){
        list[object[0]]
      }
  }
  console.log(list);
});
