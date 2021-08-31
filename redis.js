const redis = require("redis");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  user: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

console.log("Redis Client Initialized ");

client.on("error", (err) => {
  console.log("Error " + err);
});

exports.client = client;
