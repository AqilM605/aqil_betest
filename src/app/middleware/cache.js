const { client } = require("../../../redis");

exports.cache = () => {
  return (req, res, next) => {
    const key = req.originalUrl.split("/")[2];
    client.get(key, (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      if (data !== null) {
        console.log("fetch from cached");
        return res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  };
};
