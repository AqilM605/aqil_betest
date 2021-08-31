const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
  // password: "",
});

console.log("Redis Client Initialized ");

client.on("error", (err) => {
  console.log("Error " + err);
});

exports.client = client;
