import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { ProgramRepository } from "../repositories/ProgramRepository";
import { UserRepository } from "../repositories/UserRepository";

export class FavoriteService {
  private repository: FavoriteRepository;
  private userRepository: UserRepository;
  private programRepository: ProgramRepository;

  constructor() {
    this.repository = new FavoriteRepository();
    this.userRepository = new UserRepository();
    this.programRepository = new ProgramRepository();
  }

  async getUserFavorites(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const favorites = await this.repository.findByUser(userId);
    return favorites.map(fav => ({
      id: fav.id,
      userId: fav.userId,
      programId: fav.programId,
      program: {
        id: fav.program.id,
        title: fav.program.title,
        description: fav.program.description,
        institution: fav.program.institution?.name || "",
        category: fav.program.category,
        level: fav.program.level,
        imageUrl: fav.program.imageUrl,
      },
      createdAt: fav.createdAt,
    }));
  }

  async addFavorite(userId: string, programId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const program = await this.programRepository.findById(programId);
    if (!program) {
      throw new Error("Program not found");
    }

    const existing = await this.repository.findByUserAndProgram(userId, programId);
    if (existing) {
      throw new Error("Program already favorited");
    }

    const favorite = await this.repository.create(userId, programId);
    return {
      id: favorite.id,
      userId: favorite.userId,
      programId: favorite.programId,
      message: "Program added to favorites",
    };
  }

  async removeFavorite(userId: string, programId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const favorite = await this.repository.findByUserAndProgram(userId, programId);
    if (!favorite) {
      throw new Error("Favorite not found");
    }

    await this.repository.delete(favorite.id);
    return { message: "Program removed from favorites" };
  }
}
