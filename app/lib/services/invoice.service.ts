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
  private invoiceRepository;
  private customerService;
  constructor(
    invoiceRepository: InvoiceRepository,
    customerService: CustomerService
  ) {
    this.invoiceRepository = invoiceRepository;
    this.customerService = customerService;
  }

  async findAllInvoices() {
    return await this.invoiceRepository.getAll();
  }

  async getTotalInvoiceCount() {
    return await this.invoiceRepository.totalCount();
  }

  async getTotalInvoiceCountsGroupedBy(
    groupByFieldId: string,
    countField?: string
  ) {
    const results = await this.invoiceRepository.countGroupBy(
      groupByFieldId,
      countField
    );
    return results.reduce((prev, current) => Object.assign({[prev._id]: prev.totalAmount}, {[current._id]: current.totalAmount}))
  }

  async findInvoices(
    sort: { [field: string]: SORT_ORDER.ASC | SORT_ORDER.DESC },
    limit?: number
  ) {
    const invoices = await this.invoiceRepository.getSortedLimit(
      {},
      sort,
      limit
    );
    return await Promise.all(
      invoices?.map(async ({ id, amount, customer_id }) => {
        const { image_url, name, email } =
          (await this.customerService.findCustomerById(customer_id)) || {};
        return {
          id,
          image_url,
          name,
          email,
          amount,
        };
      })
    );
  }
}

const invoiceService = new InvoiceService(
  new InvoiceRepository(),
  customerService
);
export { invoiceService };
