import path from "path";
import express from "express";
import multer from "multer";

// storage: This is an object configured with multer.diskStorage, which specifies where and how the files should be stored.

// destination: A function that sets the directory where the uploaded files will be stored. In this case, it’s set to "uploads/". 
// The cb (callback) function is used to handle errors (first argument) and the actual directory path (second argument).

// filename: This function defines the naming convention for uploaded files. Here, each file is named as follows:

// ${file.fieldname}-${Date.now()}${path.extname(file.originalname)}
// file.fieldname: The field name from the form (in this case, "image").
// Date.now(): Current timestamp to ensure unique filenames.
// path.extname(file.originalname): Extracts the original file extension (e.g., .jpg, .png) and appends it to the filename.


const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("images only");
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
