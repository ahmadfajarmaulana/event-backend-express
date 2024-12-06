import { Router } from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    updateStatusEvent
} from "../controllers/EventController";
import { AuthCheck, AuthCheckRole } from "../middleware/AuthCheck";


const router = Router();

router.post("/", AuthCheck, AuthCheckRole(["organizer"]), createEvent);
router.get("/", AuthCheck, AuthCheckRole(["organizer"]), getAllEvents);
router.get("/:id", AuthCheck, AuthCheckRole(["organizer"]), getEventById);
router.put("/:id", AuthCheck, AuthCheckRole(["organizer"]), updateEvent);
router.delete("/:id", AuthCheck, AuthCheckRole(["organizer"]), deleteEvent);
router.put("/:id/status", AuthCheck, AuthCheckRole(["organizer"]), updateStatusEvent);






export default router;