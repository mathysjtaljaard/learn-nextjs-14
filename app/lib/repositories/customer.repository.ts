import { Schema } from "mongoose";
import Customer, { ACustomer } from "../models/customer.model";
import { AbstractRepository } from "./abstract.repository";
const { v4: uuidv4 } = require("uuid");

export class CustomerRepository extends AbstractRepository {
  async getAll(shouldPopulate = false, query = {}, fields?: string) {
    const search = Customer.find(query, fields, null);
    if (shouldPopulate) return await search.populate("invoices").exec();

    return await search.exec();
  }

  async totalCount(match?: any) {
    return await Customer.countDocuments(match);
  }

  async getById(id: string, shouldPopulate = false) {
    let result;

    if (shouldPopulate) {
      result = await Customer.find({ id }).populate("invoices");
    } else {
      result = await Customer.find({ id });
    }
  
    if (result.length > 1)
      throw Error(`More than one customer with the same id ${id}`);
    return result[0];
  }

  async getByObjectId(id: string) {
    return await Customer.findOne({ _id: id }).populate("invoices");
  }

  async findByQuery(query: any, shouldPopulate = false) {
    if (shouldPopulate)
      return await Customer.find(query).populate("invoices");

    return await Customer.find(query)
  }

  async create(customer: ACustomer) {
    return await Customer.create({ ...customer, id: uuidv4() });
  }
  async update(customer: ACustomer) {
    return Customer.updateOne({ id: customer.id }, customer).exec();
  }

  async deleteById(id: string) {
    return Customer.deleteOne({ id }).exec();
  }
  async deleteAll() {
    await Customer.deleteMany({});
  }
}
