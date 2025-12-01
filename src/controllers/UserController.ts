import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.service.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id);
      res.json(user);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = await this.service.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === "Missing required fields" || error.message === "Email already exists") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.updateUser(id, req.body);
      res.json(user);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.service.deleteUser(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
