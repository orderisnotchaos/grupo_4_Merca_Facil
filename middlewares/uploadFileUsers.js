const multer = require('multer');
const path =require('path');


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.resolve('./public/images/avatars'));
    },

    filename: (req, file, cb) => {

        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        req.body.avatar = fileName;
        cb(null, fileName);
    }

});

const uploadFile = multer( {storage} );

module.exports = uploadFile;