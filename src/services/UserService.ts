import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers() {
    const users = await this.repository.findAll();
    return users.map(user => this.formatUser(user));
  }

  async getUserById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.formatUser(user);
  }

  async createUser(data: any) {
    if (!data.name || !data.email) {
      throw new Error("Missing required fields");
    }

    const existing = await this.repository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already exists");
    }

    const userData = {
      name: data.name,
      email: data.email,
      interests: JSON.stringify(data.interests || []),
      level: data.level || "iniciante",
    };

    const user = await this.repository.create(userData);
    return this.formatUser(user);
  }

  async updateUser(id: string, data: any) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.interests) updateData.interests = JSON.stringify(data.interests);
    if (data.level) updateData.level = data.level;

    const user = await this.repository.update(id, updateData);
    return this.formatUser(user);
  }

  async deleteUser(id: string) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    await this.repository.delete(id);
    return { message: "User deleted successfully" };
  }

  private formatUser(user: any) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      interests: JSON.parse(user.interests || "[]"),
      level: user.level,
      favorites: user.favorites || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
