import { CustomerRepository } from "../repositories/customer.repository";

export class CustomerService {
  private customerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async findCustomerById(id: string) {
    return await this.customerRepository.getById(id);
  }

  async getTotalCustomerCount() {
    return await this.customerRepository.totalCount();
  }
}

const customerService = new CustomerService(new CustomerRepository());
export { customerService };
