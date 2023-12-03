import { ARevenue } from "../models/revenue.model";
import { RevenueRepository } from "../repositories/revenue.repository";

class RevenueService {
  private repository;
  constructor(repository: RevenueRepository) {
    this.repository = repository;
  }

  async createOrUpdate(revenue: ARevenue) {
    if (revenue?.id) {
      return await this.repository.update(revenue);
    }
    return await this.repository.create(revenue);
  }
  async findAllRevenue() {
    return await this.repository.getAll();
  }

  async deleteAll() {
    await this.repository.deleteAll();
  }
}

const revenueService = new RevenueService(new RevenueRepository());
export { revenueService };
