import { ProgramRepository } from '../repositories/ProgramRepository';

export class ProgramService {
  private repository: ProgramRepository;

  constructor() {
    this.repository = new ProgramRepository();
  }

  async getAllPrograms() {
    const programs = await this.repository.findAll();
    return programs.map(program => this.formatProgram(program));
  }

  async getProgramById(id: string) {
    const program = await this.repository.findById(id);
    if (!program) {
      throw new Error('Program not found');
    }
    return this.formatProgram(program);
  }

  async createProgram(data: any) {
    // Valida??es
    if (!data.title || !data.description || !data.institutionId) {
      throw new Error('Missing required fields');
    }

    const programData = {
      title: data.title,
      description: data.description,
      institutionId: data.institutionId,
      category: data.category,
      level: data.level,
      duration: data.duration,
      format: data.format,
      startDate: data.startDate,
      endDate: data.endDate,
      requirements: JSON.stringify(data.requirements || []),
      benefits: JSON.stringify(data.benefits || []),
      imageUrl: data.imageUrl || '',
      isActive: data.isActive !== undefined ? data.isActive : true,
    };

    const program = await this.repository.create(programData);
    return this.formatProgram(program);
  }

  async updateProgram(id: string, data: any) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error('Program not found');
    }

    const updateData: any = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.institutionId) updateData.institutionId = data.institutionId;
    if (data.category) updateData.category = data.category;
    if (data.level) updateData.level = data.level;
    if (data.duration) updateData.duration = data.duration;
    if (data.format) updateData.format = data.format;
    if (data.startDate) updateData.startDate = data.startDate;
    if (data.endDate) updateData.endDate = data.endDate;
    if (data.requirements) updateData.requirements = JSON.stringify(data.requirements);
    if (data.benefits) updateData.benefits = JSON.stringify(data.benefits);
    if (data.imageUrl) updateData.imageUrl = data.imageUrl;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const program = await this.repository.update(id, updateData);
    return this.formatProgram(program);
  }

  async deleteProgram(id: string) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error('Program not found');
    }

    await this.repository.delete(id);
    return { message: 'Program deleted successfully' };
  }

  async getProgramsByInstitution(institutionId: string) {
    const programs = await this.repository.findByInstitution(institutionId);
    return programs.map(program => this.formatProgram(program));
  }

  async getProgramsByCategory(category: string) {
    const programs = await this.repository.findByCategory(category);
    return programs.map(program => this.formatProgram(program));
  }

  async getProgramsByLevel(level: string) {
    const programs = await this.repository.findByLevel(level);
    return programs.map(program => this.formatProgram(program));
  }

  private formatProgram(program: any) {
    return {
      id: program.id,
      title: program.title,
      description: program.description,
      institution: program.institution?.name || '',
      institutionId: program.institutionId,
      category: program.category,
      level: program.level,
      duration: program.duration,
      format: program.format,
      startDate: program.startDate,
      endDate: program.endDate,
      requirements: JSON.parse(program.requirements || '[]'),
      benefits: JSON.parse(program.benefits || '[]'),
      imageUrl: program.imageUrl,
      isActive: program.isActive,
      createdAt: program.createdAt,
      updatedAt: program.updatedAt,
    };
  }
}
