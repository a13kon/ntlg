const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, __dirname+'/../booksFiles');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

module.exports = multer({storage});

