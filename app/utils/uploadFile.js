const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../upload/tmp/'))
  },
  filename: function (req, file, cb) {
      console.log(uuid.v4() )
      let fileFormat = (file.originalname).split(".");
      cb(null, uuid.v4() + "." + fileFormat[fileFormat.length - 1]);
  }
})
 
const upload = multer({ storage: storage })

module.exports = upload
