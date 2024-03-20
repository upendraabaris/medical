const { Redis } = require("ioredis");


const client = new Redis({
    port: 16387, // Redis port
    host: "redis-16387.c305.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "QwFLwUCRoUg1qFF3Uaoj3eFJYh7CEAok",
    db: 0, // Defaults to 0
});

module.exports = client;