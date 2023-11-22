import { Schema } from "mongoose";
import Customer, {
  ACustomer,
} from "../models/customer.model";
import { AbstractRepository } from "./abstract.repository";
const { v4: uuidv4 } = require("uuid");

export class CustomerRepository extends AbstractRepository {
  
  async getAll() {
    return await Customer.find().populate('invoices');
  }

  async totalCount(match?: any) {
    return await Customer.countDocuments(match);
  }

  async getById(id: string) {
    const result = await Customer.find({ id }).populate('invoices');
    if (result.length > 1) throw Error(`More than one customer with the same id ${id}`)
    return result[0];
  }

  async getByObjectId(id:  Schema.Types.ObjectId) {
    const result = await Customer.findOne({_id: id}).populate('invoices')
  }

  async findByQuery(query: any) {
    return await Customer.find(query).populate('invoices')
  }

  async create(customer: ACustomer) {
    return await Customer.create({ ...customer, id: uuidv4() });
  }
  async update(customer: ACustomer) {
    return Customer.updateOne({ id: customer.id }, customer);
  }

  async deleteById(id: string) {
    return Customer.deleteOne({ id });
  }
  async deleteAll() {
    await Customer.deleteMany({});
  }
}
