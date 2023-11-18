import Invoice, { CreateInvoice, UpdateInvoice } from "../models/invoice.model";
import { AbstractRepository } from "./abstract.repository";
const { v4: uuidv4 } = require("uuid");

export class InvoiceRepository extends AbstractRepository {
  async getAll() {
    return await Invoice.find();
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
    return await Invoice.find(query, null, queryOptions);
  }

  async findByQuery(query: any) {
    return await Invoice.find(query);
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
    return await Invoice.findById({ id });
  }

  async create(invoice: CreateInvoice) {
    return await Invoice.create({ ...invoice, id: uuidv4() });
  }

  async update(invoice: UpdateInvoice) {
    return await Invoice.updateOne({ id: invoice.id }, invoice);
  }

  async deleteById(id: string) {
    return await Invoice.deleteOne({ id });
  }
  async deleteAll() {
    await Invoice.deleteMany({});
  }
}
