import Revenue, { ARevenue } from "../models/revenue.model";
import { AbstractRepository } from "./abstract.repository";
const { v4: uuidv4 } = require("uuid");

export class RevenueRepository extends AbstractRepository {

  async findByQuery(query: any) {
      return await Revenue.find(query);
  }
  
  async totalCount(match: any) {
    return await Revenue.countDocuments(match)
  }
  async getAll() {
    return await Revenue.find();
  }

  async getById(id: string) {
    return await Revenue.findById(id);
  }

  async create(user: ARevenue) {
    return await Revenue.create({ ...user, id: uuidv4() });
  }

  async update(user: ARevenue) {
    return await Revenue.updateOne({ id: user.id }, user);
  }

  async deleteById(id: string) {
    await Revenue.deleteOne({ id });
  }
  
  async deleteAll() {
    await Revenue.deleteMany({});
  }
}

