import { Router } from "express";
import { uploadImage } from "../controllers/ImageController";
import uploadMiddleware from "../middleware/multer";


const router = Router();

router.post("/upload", uploadMiddleware.single("avatar"), uploadImage);

export default router;