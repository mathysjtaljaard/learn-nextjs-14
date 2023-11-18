import { RevenueRepository } from "../repositories/revenue.repository";

class RevenueService {

  private revenueRepository;
  constructor(revenueRepository: RevenueRepository){
    this.revenueRepository = revenueRepository
  }

  async findAllRevenue() {
    return await this.revenueRepository.getAll()
  }
}

const revenueService = new RevenueService(new RevenueRepository());
export { revenueService };
