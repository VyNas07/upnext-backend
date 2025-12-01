import { Router } from "express";
import { FavoriteController } from "../controllers/FavoriteController";

const router = Router();
const controller = new FavoriteController();

router.get("/user/:userId", (req, res) => controller.getUserFavorites(req, res));
router.post("/", (req, res) => controller.addFavorite(req, res));
router.delete("/", (req, res) => controller.removeFavorite(req, res));

export default router;
