const app = require("./index");
require("dotenv").config("..env");
// set port, listen for requests

const PORT = process.env.PORT || process.env.PORT_BACKUP;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
