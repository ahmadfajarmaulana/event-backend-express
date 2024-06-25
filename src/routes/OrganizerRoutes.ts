import { Router } from "express";
import { createOrganizer } from "../controllers/OrganizerController";


const router = Router();

router.post('/', createOrganizer);

export default router;