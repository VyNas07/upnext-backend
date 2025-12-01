import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class InstitutionRepository {
  async findAll() {
    return await prisma.institution.findMany({
      include: {
        programs: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    return await prisma.institution.findUnique({
      where: { id },
      include: {
        programs: true,
      },
    });
  }

  async create(data: any) {
    return await prisma.institution.create({
      data,
      include: {
        programs: true,
      },
    });
  }

  async update(id: string, data: any) {
    return await prisma.institution.update({
      where: { id },
      data,
      include: {
        programs: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.institution.delete({
      where: { id },
    });
  }
}
