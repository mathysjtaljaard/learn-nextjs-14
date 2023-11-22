import { ACustomer } from "../models/customer.model";
import { CustomerRepository } from "../repositories/customer.repository";

export class CustomerService {
  private repository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async createOrUpdate(customer: ACustomer) {
    if (customer?.id) {
      return await this.repository.update(customer);
    }
    return await this.repository.create(customer);
  }

  async findById(id: string) {
    return await this.repository.getById(id);
  }

  async getTotalCount() {
    return await this.repository.totalCount();
  }

  async findByTerm(term: string) {
    return await this.repository.findByQuery({
      $or: [
        {
          name: new RegExp(term),
        },
        {
          email: new RegExp(term),
        },
      ],
    });
  }

  async deleteAll() {
    await this.repository.deleteAll();
  }
}

const customerService = new CustomerService(new CustomerRepository());
export { customerService };
