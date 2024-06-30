import { Router } from "express";
import { login, register } from "../controllers/AuthController";

const router = Router();

router.post("/register", register)
router.post("/login", login)
// router.post("/refresh-token")
// router.post("/logout", AuthCheck)

export default router;