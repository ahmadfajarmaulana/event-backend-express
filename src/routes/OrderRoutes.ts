import { Router } from "express";
import { index } from "../controllers/OrderController";
import { AuthCheck, AuthCheckRole } from "../middleware/AuthCheck";



const router = Router();

router.get("/", AuthCheck, AuthCheckRole(["organizer", "owner"]), index);

export default router;