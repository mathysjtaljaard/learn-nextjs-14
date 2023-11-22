import { flatten } from "lodash";
import { AInvoice } from "../models/invoice.model";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { CustomerService, customerService } from "./customer.service";
export enum SORT_ORDER {
  ASC = "asc",
  DESC = "desc",
}

export enum INVOICE_STATUS {
  PAID = "paid",
  PENDING = "pending",
}
class InvoiceService {
  private repository;
  private customerService;
  constructor(repository: InvoiceRepository, customerService: CustomerService) {
    this.repository = repository;
    this.customerService = customerService;
  }

  async createOrUpdate(invoice: AInvoice) {
    if (invoice?.id) {
      return await this.repository.update(invoice);
    }
    return await this.repository.create(invoice);
  }

  async findAll() {
    return await this.repository.getAll();
  }

  async getTotalCount() {
    return await this.repository.totalCount();
  }

  async findByTerm(term: string, limit?: number, offset?: number) {
    const regexTerm = new RegExp(term, 'ig');
    console.log(regexTerm)
    let orClause: any = [
      { status: regexTerm },
      {
        $expr: {
          $function: {
            body: `function body(amount, regexTerm) {
              return amount.toString().match(regexTerm);
            }`,
            args: ["$amount", regexTerm],
            lang: "js",
          },
        },
      },
      {
        $expr: {
          $function: {
            body: `function body(date, regexTerm) {
              return new Date(date).toUTCString().match(regexTerm);
            }`,
            args: ["$date", regexTerm],
            lang: "js",
          },
        },
      },
    ];

    const matchedCustomers = await this.customerService.findByTerm(term);
    if (matchedCustomers?.length > 0) {
      const result = flatten(
        matchedCustomers.map(({ invoices }) =>
          invoices.map((value: { _id: any }) => value._id)
        )
      );
      if (result.length > 0) {
        orClause.push({ _id: { $in: result } });
      }
    }

    let queryTerm: any = {
      $or: orClause
    };
    const matchedInvoices = await this.repository.findByQuery(queryTerm, limit, offset);
    return matchedInvoices;
  }

  async getTotalCountsGroupedBy(groupByFieldId: string, countField?: string) {
    const results = await this.repository.countGroupBy(
      groupByFieldId,
      countField
    );
    return results.reduce((prev, current) =>
      Object.assign(
        { [prev._id]: prev.totalAmount },
        { [current._id]: current.totalAmount }
      )
    );
  }

  async find(
    sort: { [field: string]: SORT_ORDER.ASC | SORT_ORDER.DESC },
    limit?: number
  ) {
    const invoices = await this.repository.getSortedLimit({}, sort, limit);
    return invoices.map(({ id, amount, customer }) => {
      const { name, email, image_url } = customer;
      return {
        id,
        image_url,
        name,
        email,
        amount,
      };
    });
  }

  async deleteAll() {
    await this.repository.deleteAll();
  }
}

const invoiceService = new InvoiceService(
  new InvoiceRepository(),
  customerService
);

export { invoiceService };
