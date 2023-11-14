import { BaseService } from "./base.service";
import Invoice, { CreateInvoice, UpdateInvoice } from "../models/invoice.model";
const { v4: uuidv4 } = require("uuid");

class InvoiceService extends BaseService {
  async getAll() {
    await this._getConnection();
    return await Invoice.find();
  }

  async getById(id: string) {
    await this._getConnection();
    return await Invoice.findById({ id });
  }

  async create(invoice: CreateInvoice) {
    await this._getConnection();
    return await Invoice.create({ ...invoice, id: uuidv4() });
  }

  async update(invoice: UpdateInvoice) {
    await this._getConnection();
    return await Invoice.updateOne({ id: invoice.id }, invoice);
  }

  async deleteById(id: string) {
    await this._getConnection();
    return await Invoice.deleteOne({ id });
  }
  async deleteAll() {
    await this._getConnection();
    await Invoice.deleteMany({});
  }
}

const invoiceService = new InvoiceService();
export { invoiceService };
