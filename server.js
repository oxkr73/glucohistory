require("./server/config/config");

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static(__dirname + "/public"));

/* Body Parser - Gestiona los datos enviados por http */
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/* HBS - Handlebars templates */
const hbs = require("hbs");

// HBS engine for Express
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(require("./server/routes/usuario"));
app.use(require("./server/routes/gluco-history"));
app.use(require("./server/routes/gluco-history2"));
app.use(require("./server/routes/gluco-chart"));
app.use(require("./server/routes/upload-form"));

mongoose.connect(
  "mongodb://localhost:27017/gluco",
  { useCreateIndex: true, useNewUrlParser: true },

  (err, res) => {
    if (err) throw err;

    console.log("Base de datos ONLINE");
  }
);

app.listen(process.env.PORT, function() {
  console.log("Example app listening on port:", process.env.PORT);
});
