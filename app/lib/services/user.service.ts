import User, { CreateUser, UpdateUser } from "../models/user.model";
import { exit } from "process";
const { v4: uuidv4 } = require("uuid");

import { users } from "../placeholder-data";
import { BaseService } from "./base.service";

export class UserService extends BaseService {
  async getAll() {
    await this._getConnection();
    return await User.find();
  }

  async getById(id: string) {
    await this._getConnection();
    return await User.findById(id);
  }

  async create(user: CreateUser) {
    await this._getConnection();
    return await User.create({ ...user, id: uuidv4() });
  }

  async update(user: UpdateUser) {
    await this._getConnection();
    return await User.updateOne({ id: user.id }, user);
  }

  async deleteById(id: string) {
    await this._getConnection();
    await User.deleteOne({ id });
  }

  async deleteAll() {
    await this._getConnection();
    await User.deleteMany({});
  }
}
