import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProgramRepository {
  async findAll() {
    return await prisma.program.findMany({
      include: {
        institution: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return await prisma.program.findUnique({
      where: { id },
      include: {
        institution: true,
      },
    });
  }

  async create(data: any) {
    return await prisma.program.create({
      data,
      include: {
        institution: true,
      },
    });
  }

  async update(id: string, data: any) {
    return await prisma.program.update({
      where: { id },
      data,
      include: {
        institution: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.program.delete({
      where: { id },
    });
  }

  async findByInstitution(institutionId: string) {
    return await prisma.program.findMany({
      where: { institutionId },
      include: {
        institution: true,
      },
    });
  }

  async findByCategory(category: string) {
    return await prisma.program.findMany({
      where: { category },
      include: {
        institution: true,
      },
    });
  }

  async findByLevel(level: string) {
    return await prisma.program.findMany({
      where: { level },
      include: {
        institution: true,
      },
    });
  }
}
