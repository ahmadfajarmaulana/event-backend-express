import { Router } from "express";
import { AuthCheck } from "../middleware/AuthCheck";
import AuthRoutes from "./AuthRoutes";
import CategorRoutes from "./CategoryRoutes";
import EventRoutes from "./EventRoutes";
import ImageRoutes from "./ImageRoutes";
import OrganizerRoutes from "./OrganizerRoutes";
import TalentRoutes from "./TalentRoutes";
import UserRoutes from "./UserRoutes";

const routes = Router();

routes.use("/api/v1/users", AuthCheck, UserRoutes);
routes.use("/api/v1/categories", CategorRoutes);
routes.use("/api/v1/auth", AuthRoutes)
routes.use("/api/v1/images", ImageRoutes)
routes.use("/api/v1/talents", TalentRoutes)
routes.use("/api/v1/events", EventRoutes)
routes.use("/api/v1/organizer", OrganizerRoutes)

export default routes;