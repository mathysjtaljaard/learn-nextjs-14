import Customer, {
  CreateCustomer,
  UpdateCustomer,
} from "../models/customer.model";
import { AbstractRepository } from "./abstract.repository";
const { v4: uuidv4 } = require("uuid");

export class CustomerRepository extends AbstractRepository {
  async getAll() {
    return await Customer.find();
  }

  async totalCount(match?: any) {
    return await Customer.countDocuments(match);
  }

  async getById(id: string) {
    const result = await Customer.find({ id });
    if (result.length > 1) throw Error(`More than one customer with the same id ${id}`)
    return result[0];
  }

  async create(customer: CreateCustomer) {
    return await Customer.create({ ...customer, id: uuidv4() });
  }
  async update(customer: UpdateCustomer) {
    return Customer.updateOne({ id: customer.id }, customer);
  }

  async deleteById(id: string) {
    return Customer.deleteOne({ id });
  }
  async deleteAll() {
    await Customer.deleteMany({});
  }
}
