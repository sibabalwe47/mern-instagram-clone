const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3();


// Config aws-sdk

aws.config.update({
    secretAccessKey: process.env.s3_ACCESS_KEY,
    accessKeyId: process.s3_ACCESS_SECRET,
    region: "eu-west-2"
})


// Filter file upload

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "video/mp4" || file.mimetype === "video/3gpp") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG, PNG, and MP4 is allowed!"), false)
    }
}


// Multer to process the image

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: "instagram-post-media",
        metadata: function(req, file, cb) {
            cb(null, {fieldName : file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});


module.exports = upload;