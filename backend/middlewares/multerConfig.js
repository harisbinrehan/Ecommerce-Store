import multer from 'multer';

const multerConfig = () => {
  const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'uploads/');
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  });

  return multer({ storage });
};

export default multerConfig;
