import { Router } from "express";
import {
    createTalent,
    deleteTalent,
    getAllTalents,
    getTalentById,
    updateTalent
} from "../controllers/TalentController";

const router = Router();

router.post('/', createTalent);
router.get('/', getAllTalents);
router.get('/:id', getTalentById);
router.put('/:id', updateTalent);
router.delete('/:id', deleteTalent);

export default router;