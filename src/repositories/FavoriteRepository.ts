import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FavoriteRepository {
  async findByUser(userId: string) {
    return await prisma.favorite.findMany({
      where: { userId },
      include: {
        program: {
          include: {
            institution: true,
          },
        },
      },
    });
  }

  async findByUserAndProgram(userId: string, programId: string) {
    return await prisma.favorite.findFirst({
      where: {
        userId,
        programId,
      },
    });
  }

  async create(userId: string, programId: string) {
    return await prisma.favorite.create({
      data: {
        userId,
        programId,
      },
      include: {
        program: {
          include: {
            institution: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return await prisma.favorite.delete({
      where: { id },
    });
  }

  async deleteByUserAndProgram(userId: string, programId: string) {
    const favorite = await this.findByUserAndProgram(userId, programId);
    if (favorite) {
      return await this.delete(favorite.id);
    }
    return null;
  }
}
