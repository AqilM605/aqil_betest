const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  user: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

console.log("Redis Client Initialized ");
client.on("error", (err) => {
  console.log("Error " + err);
});

client.flushdb(function (err, succeeded) {
  if (succeeded) {
    console.log("Reinitializing cache");
  }
});

exports.client = client;
