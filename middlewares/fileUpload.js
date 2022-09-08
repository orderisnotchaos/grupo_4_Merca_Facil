const multer = require('multer');
const path =require('path');

let multerDiskStorage = multer.diskStorage({ 

destination: (req, file, cb) =>{
	cb(null, path.join(__dirname, '../public/images/'));
},

filename: (req, file, callback) => {
	
	const newFileName = 'products/' + req.body.category + '/' + Date.now() + path.extname(file.originalname);
	req.body.image = newFileName;
	callback(null, newFileName);
}

});

let fileUpload = multer({ storage: multerDiskStorage });

module.exports = fileUpload;