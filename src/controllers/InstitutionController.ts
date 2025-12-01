import { Request, Response } from "express";
import { InstitutionService } from "../services/InstitutionService";

export class InstitutionController {
  private service: InstitutionService;

  constructor() {
    this.service = new InstitutionService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const institutions = await this.service.getAllInstitutions();
      res.json(institutions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const institution = await this.service.getInstitutionById(id);
      res.json(institution);
    } catch (error: any) {
      if (error.message === "Institution not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const institution = await this.service.createInstitution(req.body);
      res.status(201).json(institution);
    } catch (error: any) {
      if (error.message === "Missing required fields") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const institution = await this.service.updateInstitution(id, req.body);
      res.json(institution);
    } catch (error: any) {
      if (error.message === "Institution not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.service.deleteInstitution(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === "Institution not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
