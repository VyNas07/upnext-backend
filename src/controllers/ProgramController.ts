import { Request, Response } from 'express';
import { ProgramService } from '../services/ProgramService';

export class ProgramController {
  private service: ProgramService;

  constructor() {
    this.service = new ProgramService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const programs = await this.service.getAllPrograms();
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const program = await this.service.getProgramById(id);
      res.json(program);
    } catch (error: any) {
      if (error.message === 'Program not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const program = await this.service.createProgram(req.body);
      res.status(201).json(program);
    } catch (error: any) {
      if (error.message === 'Missing required fields') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const program = await this.service.updateProgram(id, req.body);
      res.json(program);
    } catch (error: any) {
      if (error.message === 'Program not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.service.deleteProgram(id);
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Program not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getByInstitution(req: Request, res: Response) {
    try {
      const { institutionId } = req.params;
      const programs = await this.service.getProgramsByInstitution(institutionId);
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByCategory(req: Request, res: Response) {
    try {
      const { category } = req.query;
      const programs = await this.service.getProgramsByCategory(category as string);
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByLevel(req: Request, res: Response) {
    try {
      const { level } = req.query;
      const programs = await this.service.getProgramsByLevel(level as string);
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
