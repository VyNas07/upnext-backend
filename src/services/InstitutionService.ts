import { InstitutionRepository } from "../repositories/InstitutionRepository";

export class InstitutionService {
  private repository: InstitutionRepository;

  constructor() {
    this.repository = new InstitutionRepository();
  }

  async getAllInstitutions() {
    const institutions = await this.repository.findAll();
    return institutions.map(inst => ({
      ...inst,
      programsCount: inst.programs.length,
    }));
  }

  async getInstitutionById(id: string) {
    const institution = await this.repository.findById(id);
    if (!institution) {
      throw new Error("Institution not found");
    }
    return {
      ...institution,
      programsCount: institution.programs.length,
    };
  }

  async createInstitution(data: any) {
    if (!data.name || !data.description) {
      throw new Error("Missing required fields");
    }

    return await this.repository.create({
      name: data.name,
      description: data.description,
      website: data.website || "",
      logoUrl: data.logoUrl || "",
    });
  }

  async updateInstitution(id: string, data: any) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("Institution not found");
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.description) updateData.description = data.description;
    if (data.website) updateData.website = data.website;
    if (data.logoUrl) updateData.logoUrl = data.logoUrl;

    return await this.repository.update(id, updateData);
  }

  async deleteInstitution(id: string) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("Institution not found");
    }

    await this.repository.delete(id);
    return { message: "Institution deleted successfully" };
  }
}
