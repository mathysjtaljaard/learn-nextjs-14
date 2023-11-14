import Revenue, { logRevenue, updateRevenue } from "../models/revenue.model";
const { v4: uuidv4 } = require("uuid");
import { BaseService } from "./base.service";

class RevenueService extends BaseService {
  async getAll() {
    await this._getConnection();
    return await Revenue.find();
  }

  async getById(id: string) {
    await this._getConnection();
    return await Revenue.findById(id);
  }

  async create(user: logRevenue) {
    await this._getConnection();
    return await Revenue.create({ ...user, id: uuidv4() });
  }

  async update(user: updateRevenue) {
    await this._getConnection();
    return await Revenue.updateOne({ id: user.id }, user);
  }

  async deleteById(id: string) {
    await this._getConnection();
    await Revenue.deleteOne({ id });
  }
  async deleteAll() {
    await this._getConnection();
    await Revenue.deleteMany({});
  }
}

const revenueService = new RevenueService();
export { revenueService };
