const express = require ('express');
const router = express.Router();
const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || "localhost";

const client = redis.createClient({url: REDIS_URL});

(async () => {
    await client.connect()
})();


router.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;

    try {
        const cnt = await client.get(bookId);
        res.json(cnt);
    } catch (e) {
        res.json({errorcode: 500, errmsg: `reddis errod: ${e}`});
    }
});

router.post('/:bookId/incr', async(req, res) => {
    const { bookId } = req.params;

    try {
        const cnt = await client.incr(bookId);
        res.status(201);
    } catch (e) {
        res.json({errorcode: 500, errmsg: `reddis errod: ${e}`});
    }
});

module.exports = router;