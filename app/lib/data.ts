import { formatCurrency } from "./utils";
import { revenueService } from "./services/revenue.service";
import { SORT_ORDER, invoiceService } from "./services/invoice.service";
import { customerService } from "./services/customer.service";
import { unstable_noStore as noStore } from "next/cache";
import { CustomerField } from "./definitions";
import { init } from "../middleware";

// TODO: does this look like a good candidate for a controller level or split these off into their corresponding services??
async function establish() {
  const state = (await init()).dbConnectionState;
  console.log("db connection in data.ts", state);
}
establish();

export async function fetchRevenue() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const revenue = await revenueService.findAllRevenue();

    return revenue;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const invoices = await invoiceService.find({ date: SORT_ORDER.DESC }, 5);
    const latestInvoices = invoices.map((invoice: any) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = invoiceService.getTotalCount();
    const customerCountPromise = customerService.getTotalCount();
    const invoiceStatusPromise = invoiceService.getTotalCountsGroupedBy(
      "status",
      "amount"
    );

    const [invoiceCount, customerCount, { pending, paid }] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(invoiceCount ?? "0");
    const numberOfCustomers = Number(customerCount ?? "0");

    const totalPaidInvoices = formatCurrency(paid ?? "0");
    const totalPendingInvoices = formatCurrency(pending ?? "0");

    await new Promise((resolve) => setTimeout(resolve, 1999));
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await invoiceService.findByTerm(
      query,
      ITEMS_PER_PAGE,
      offset
    );
    return invoices.map(({ id, amount, status, date, customer }) => {
      const { name, image_url, email } = customer;
      return {
        id,
        name,
        email,
        status,
        amount,
        date,
        image_url,
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const invoices = await invoiceService.findByTerm(query);
    const totalPages = Math.ceil(Number(invoices.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  noStore();
  try {
    const {
      id: invoiceId,
      customer,
      status,
      amount,
      date,
    } = await invoiceService.findById(id);

    return {
      id: invoiceId,
      customer_id: customer?._id?.toString(),
      status,
      amount: amount / 100,
      date,
    };
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  noStore();
  try {
    const customers = await customerService.findAll(undefined, "name");
    return customers.map(({ _id, name }) => {
      return {
        id: _id.toString(),
        name,
      };
    });
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

// export async function fetchFilteredCustomers(query: string) {
// noStore();
//   try {
//     const data = await sql<CustomersTable>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

// export async function getUser(email: string) {
// noStore();
//   try {
//     const user = await sql`SELECT * from USERS where email=${email}`;
//     return user.rows[0] as User;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }
