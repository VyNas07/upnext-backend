import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  async findAll() {
    return await prisma.user.findMany({
      include: {
        favorites: {
          include: {
            program: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        favorites: {
          include: {
            program: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: any) {
    return await prisma.user.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
