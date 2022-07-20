const multer = require('multer');
const path =require('path');

let multerDiskStorage = multer.diskStorage({ 

destination: (req, file, cb) =>{
	cb(null, path.join(__dirname, '../public/images/'));
},

filename: (req, file, callback) => {
	const newFilename = 'products/' + req.body.category + '/' + Date.now() + path.extname(file.originalname);
	callback(null, newFilename);
}

});

let fileUpload = multer({ storage: multerDiskStorage });

module.exports = fileUpload;