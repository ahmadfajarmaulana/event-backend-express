import { Router } from "express";
import { createAdmin, createOrganizer } from "../controllers/OrganizerController";
import { AuthCheck, AuthCheckRole } from "../middleware/AuthCheck";


const router = Router();

router.post('/', createOrganizer);
router.post('/admin', AuthCheck, AuthCheckRole(["organizer"]), createAdmin);

export default router;