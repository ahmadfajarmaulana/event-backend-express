import { Router } from "express";
import { createAdmin, createOrganizer, getAllUser } from "../controllers/OrganizerController";
import { AuthCheck, AuthCheckRole } from "../middleware/AuthCheck";


const router = Router();

router.post('/', AuthCheck, AuthCheckRole(["owner"]), createOrganizer);
router.post('/admin', AuthCheck, AuthCheckRole(["organizer"]), createAdmin);
router.get('/users', AuthCheck, AuthCheckRole(["owner"]), getAllUser);


export default router;