const app = require("./app");
let port = 3000;

//Mongo DB
require("./mongo");

//Route
require("./routes");

app.listen(port, () => console.log(`Server run on ${port}`));