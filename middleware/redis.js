const { Redis } = require("ioredis");


const client = new Redis({
    port: 17370, // Redis port
    host: "redis-17370.c301.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "DCSKLKXowIJpsiY39VIGbKFFMWLGFmEK",
    db: 0, // Defaults to 0
});

module.exports = client;