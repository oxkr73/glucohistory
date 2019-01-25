const fs = require("fs");
const csv = require("fast-csv");
const moment = require("moment");

let converter = new Promise((resolve, reject) => {
  let dataArr = [];
  csv
    .fromPath("../public/assets/oscarcastel_manual.csv", { headers: false })
    .on("data", data => {
      dataArr.push(data);
    })
    .on("end", () => {
      resolve(dataArr);
    });
});

converter.then(data => {
  let filtered = data.filter((dat, idx) => {
    return idx !== 0 && idx !== 1;
  });
  let gluco = [];
  filtered.forEach((val, idx) => {
    gluco.push({
      time: moment(val[2], "DD-MM-YYYY HH:mm")._d,
      value: Number(val[14])
    });
  });

  fs.writeFile(
    "../public/assets/glucosity.json",
    JSON.stringify(gluco),
    function(err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    }
  );
});
