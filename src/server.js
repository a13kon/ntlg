const express = require('express');
const redis = require('redis');

const app = express();

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || "localhost";

const client = redis.createClient({url: REDIS_URL});

(async () => {
    await client.connect()
})()

app.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {   
    const cnt = await client.incr(name);
    res.json({message : `Hello, ${name} !`, cnt});
    } catch (e) {
        res.json({errorcode: 500, errmsg: `redis error: ${e}`})
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});