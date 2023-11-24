import { Schema } from "mongoose";
import { ACustomer } from "../models/customer.model";
import { CustomerRepository } from "../repositories/customer.repository";

export class CustomerService {
  private repository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async findAll(shouldPopulateInvoices = false, returnFields?: string) {
    return await this.repository.getAll(shouldPopulateInvoices, {}, returnFields);
  }

  async findByObjectId(id: string) {
    return await this.repository.getByObjectId(id)
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
    const regex = new RegExp(term?.replace(/\s+/g, '.*'), 'gi')
    return await this.repository.findByQuery({
      $or: [
        {
          name: regex,
        },
        {
          email: regex,
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
