const { createClient } = require('redis');
const redisClient = createClient();

(async () => {
    await redisClient.connect();
})();

redisClient.on('connect', () => console.log('::> Redis Client Connected'));
redisClient.on('error', (err) => console.log('<:: Redis Client Error', err));

function getOrSetCache(key, cb) {
    console.log('inside getset');
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            
            if (error) return reject(error)
            console.log('no error');
            if (data != null) return resolve(JSON.parse(data))
            console.log('no data');

            const freshData = await cb()

            var DEFAULT_EXPIRATION = 3600;
            redisClient.SETEX(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}

module.exports = { redisClient, getOrSetCache }