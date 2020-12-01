const express = require("express");
const router = express.Router();
const upload = require("../../services/imageupload");
const { auth } = require("../../middleware/auth");
const singleUpload = upload.single("file");

// Upload file
router.post("/", auth, (req, res) => {
    singleUpload(req, res, (err) => {
        if(err) {
            return res.json({
                success: false,
                errors: err.message
            })
        }

        console.log(req.file);
    })
    res.send('Hello')
})


module.exports = router;