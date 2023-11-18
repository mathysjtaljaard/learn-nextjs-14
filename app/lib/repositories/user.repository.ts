import User, { CreateUser, UpdateUser } from "../models/user.model";
import { AbstractRepository } from "./abstract.repository";
const { v4: uuidv4 } = require("uuid");

export class UserRepository extends AbstractRepository {
  async totalCount(match: any) {
    return await User.countDocuments(match);
  }
  async findByQuery(query: any) {
    return await User.find(query);
  }

  async getAll() {
    return await User.find();
  }

  async getById(id: string) {
    return await User.findById(id);
  }

  async create(user: CreateUser) {
    return await User.create({ ...user, id: uuidv4() });
  }

  async update(user: UpdateUser) {
    return await User.updateOne({ id: user.id }, user);
  }

  async deleteById(id: string) {
    await User.deleteOne({ id });
  }

  async deleteAll() {
    await User.deleteMany({});
  }
}
