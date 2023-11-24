import Invoice, { AInvoice } from "../models/invoice.model";
import { AbstractRepository } from "./abstract.repository";
const { v4: uuidv4 } = require("uuid");

export class InvoiceRepository extends AbstractRepository {
  async getAll() {
    return await Invoice.find().populate("customer");
  }

  async getSortedLimit(
    query = {},
    sortDefinition?: { [value: string]: string },
    limit?: number
  ) {
    const queryOptions = {
      ...(limit && { limit }),
      ...(sortDefinition && { sort: sortDefinition }),
    };
    return await Invoice.find(query, null, queryOptions).populate("customer");
  }

  async findByQuery(query: any, limit?: number, offset?: number) {
    const queryOptions = {
      ...(limit && { limit }),
      ...(offset && { skip: offset }),
    };
    return await Invoice.find(query, null, queryOptions).populate("customer");
  }

  async totalCount(match?: any) {
    return await Invoice.countDocuments(match);
  }

  async countGroupBy(groupByFieldId: string, countField?: any) {
    return await Invoice.aggregate([
      {
        $group: {
          _id: `$${groupByFieldId}`,
          totalAmount: { $sum: countField ? `$${countField}` : 1 },
        },
      },
    ]);
  }
  async getById(id: string) {
    return await Invoice.findById({ id }).populate("customer");
  }

  async create(invoice: AInvoice) {
    return await Invoice.create({ ...invoice, id: uuidv4() });
  }

  async update(invoice: AInvoice) {
    return await Invoice.updateOne({ id: invoice.id }, invoice).exec();
  }

  async deleteById(id: string) {
    return await Invoice.deleteOne({ id }).exec();
  }
  async deleteAll() {
    await Invoice.deleteMany({}).exec();
  }
}
