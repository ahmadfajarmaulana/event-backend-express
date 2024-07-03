import { Router } from "express";
import {
    createTalent,
    deleteTalent,
    getAllTalents,
    getTalentById,
    updateTalent
} from "../controllers/TalentController";
import { AuthCheck, AuthCheckRole } from "../middleware/AuthCheck";

const router = Router();

router.post('/', AuthCheck, AuthCheckRole(["organizer"]), createTalent);
router.get('/', AuthCheck, AuthCheckRole(["organizer"]), getAllTalents);
router.get('/:id', AuthCheck, AuthCheckRole(["organizer"]), getTalentById);
router.put('/:id', AuthCheck, AuthCheckRole(["organizer"]), updateTalent);
router.delete('/:id', AuthCheck, AuthCheckRole(["organizer"]), deleteTalent);

export default router;