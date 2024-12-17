import multer from "multer";
import appParamRepository from "../repository/app-param-repository.js";
import appParam from "../utils/constants/app-param.js";
import fs from "fs";

function createDirIfNotExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === appParam.PROFILE_PIC) {
      appParamRepository.getAppParamByName(appParam.PROFILE_PIC).then((data) => {
        createDirIfNotExists(data.param_value);
        cb(null, data.param_value);
      });
    } else if (file.fieldname === appParam.AADHAR_PIC) {
      appParamRepository.getAppParamByName(appParam.AADHAR_PIC).then((data) => {
        createDirIfNotExists(data.param_value);
        cb(null, data.param_value);
      });
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Generate unique file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});
export default upload;
