import { Router } from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent
} from "../controllers/EventController";


const router = Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);






export default router;