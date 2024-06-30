import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/CategoryController";
import { AuthCheck, AuthCheckRole } from "../middleware/AuthCheck";

const router = Router();

router.post('/', AuthCheck, AuthCheckRole(["organizer"]), createCategory);
router.get('/', AuthCheck, AuthCheckRole(["organizer", "admin"]), getAllCategories);
router.get('/:id', AuthCheck, AuthCheckRole(["organizer", "admin"]), getCategoryById);
router.put('/:id', AuthCheck, AuthCheckRole(["organizer"]), updateCategory);
router.delete('/:id', AuthCheck, AuthCheckRole(["organizer"]), deleteCategory);

export default router;