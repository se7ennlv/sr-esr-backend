const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const rootPath = path.resolve('./');
const destPath = `${rootPath}/public/uploads/`;

const MIME_TYPES = {
    'image/webp': 'webp',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const extPath = req.body.extPath;
        const fullPath = destPath + extPath;

        mkdirp(fullPath).then(made =>
            cb(null, fullPath)
        );
    },
    filename: (req, file, cb) => {
        const name = Date.now();
        const ext = MIME_TYPES[file.mimetype];
        cb(null, name + '.' + ext);
    }
});

module.exports.single = multer({ storage: storage }).single('file');
