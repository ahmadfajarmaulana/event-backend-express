import { Request } from "express";
import fs from "fs";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from 'path';

const uploadPath = path.join(__dirname, '../public/uploads');
const storage: StorageEngine = multer.diskStorage({
    destination: function (_req: Request, _file, cb) {
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (_req: Request, file, cb) {
        cb(null, Math.floor(Math.random() * 99999999) + "-" + file.originalname.replace(/\s+/g, '_'));
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    console.log(file)
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb({ message: "Unsupported file format : " + file.mimetype.split('/')[1].split('.').pop() } as any, false);
    }
};

const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 3000000, // 3MB
    },
    fileFilter: fileFilter,
});

export default uploadMiddleware;
