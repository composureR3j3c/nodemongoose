const storage = multer.diskStorage({
    function(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toDateString() + file.originalname);
      // cb(null, new Date().toISOString() + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid type"), false);
    }
  };
  
  // destination doesn't throw new error
  // const upload=multer({dest:'./uploads/'})
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
  });

  module.exports={upload}