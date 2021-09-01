const { client } = require("../../../redis");

//midleware for caching using redis
exports.cache = () => {
  return (req, res, next) => {
    // fetch data based on request key parameter from cache, if the data present return data from cache
    const key = req.originalUrl.split("/")[2];
    client.get(key, (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }

      //otherwise fetch from database
      if (data !== null) {
        console.log("fetch from cached");
        return res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  };
};
