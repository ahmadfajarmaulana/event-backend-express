import { Router } from "express";
import { AuthCheck } from "../middleware/AuthCheck";
import AuthRoutes from "./AuthRoutes";
import CategorRoutes from "./CategoryRoutes";
import ImageRoutes from "./ImageRoutes";
import UserRoutes from "./UserRoutes";

const routes = Router();

routes.use("/api/v1/users", AuthCheck, UserRoutes);
routes.use("/api/v1/categories", CategorRoutes);
routes.use("/api/v1/auth", AuthRoutes)
routes.use("/api/v1/images", ImageRoutes)

export default routes;