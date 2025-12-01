import { Request, Response } from "express";
import { FavoriteService } from "../services/FavoriteService";

export class FavoriteController {
  private service: FavoriteService;

  constructor() {
    this.service = new FavoriteService();
  }

  async getUserFavorites(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const favorites = await this.service.getUserFavorites(userId);
      res.json(favorites);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async addFavorite(req: Request, res: Response) {
    try {
      const { userId, programId } = req.body;
      if (!userId || !programId) {
        return res.status(400).json({ error: "Missing userId or programId" });
      }
      const result = await this.service.addFavorite(userId, programId);
      res.status(201).json(result);
    } catch (error: any) {
      if (error.message === "User not found" || error.message === "Program not found") {
        res.status(404).json({ error: error.message });
      } else if (error.message === "Program already favorited") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async removeFavorite(req: Request, res: Response) {
    try {
      const { userId, programId } = req.body;
      if (!userId || !programId) {
        return res.status(400).json({ error: "Missing userId or programId" });
      }
      const result = await this.service.removeFavorite(userId, programId);
      res.json(result);
    } catch (error: any) {
      if (error.message === "User not found" || error.message === "Favorite not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
