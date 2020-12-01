const upload = require("../services/imageupload");
const singleUpload = upload.array('file', 10);