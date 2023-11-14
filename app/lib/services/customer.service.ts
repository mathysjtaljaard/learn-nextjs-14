import { BaseService } from "./base.service";
import Customer, {
  CreateCustomer,
  UpdateCustomer,
} from "../models/customer.model";
const { v4: uuidv4 } = require("uuid");

class CustomerService extends BaseService {
  async getAll() {
    await this._getConnection();
    return await Customer.find();
  }

  async getById(id: string) {
    await this._getConnection();
    return await Customer.find({ id }).populate("invoices");
  }

  async create(customer: CreateCustomer) {
    await this._getConnection();
    return await Customer.create({ ...customer, id: uuidv4() });
  }
  async update(customer: UpdateCustomer) {
    await this._getConnection();
    return Customer.updateOne({ id: customer.id }, customer);
  }

  async deleteById(id: string) {
    await this._getConnection();
    return Customer.deleteOne({ id });
  }
  async deleteAll() {
    await this._getConnection();
    await Customer.deleteMany({});
  }
}

const customerService = new CustomerService();
export { customerService };
