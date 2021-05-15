var express = require('express');
var router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req,file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const uploader = multer({storage:storage});

router.get('/', (req, res, next) =>{
  res.render('index')
});

router.post('/upload_page', uploader.array('MarkerIMG'), (req,res,next)=>{
  console.log(req.files),
  console.log('파일 업로드'),
  res.redirect('/');
});

module.exports = router;
