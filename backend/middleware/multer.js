import multer from "multer"
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.PUBLIC_PATH);
      },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${(file.originalname)}`);
    }
})


const upload = multer({storage})


export default upload