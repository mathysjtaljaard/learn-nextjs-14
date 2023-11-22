const {
  getInvoices,
  customers,
  revenue,
  users,
} = require("../app/lib/placeholder-data-mongo.js");
import { userService } from "../app/lib/services/user.service";
import { customerService } from "../app/lib/services/customer.service";
import { revenueService} from "../app/lib/services/revenue.service";
import { invoiceService } from "../app/lib/services/invoice.service";
import { exit } from "process";
import dbConnect from "../app/lib/connectors/mongodb/mongoose-connector";

const bcrypt = require("bcrypt");

async function seedUsers() {
  try {
    return await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return await userService.createOrUpdate({
          ...user,
          password: hashedPassword,
        });
      })
    );
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedCustomers() {
  try {
    return await Promise.all(
      customers.map(
        async (customer) => await customerService.createOrUpdate(customer)
      )
    );
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedInvoices(createdCustomers) {
  try {
    return await Promise.all(
      getInvoices(createdCustomers).map(
        async (invoice) => {
          const newInvoice = await invoiceService.createOrUpdate(invoice)
          const customer = await customerService.findById(invoice.customer_id)
          customer.invoices.push(newInvoice._id)
          await customer.save()
        }
      )
    );
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedRevenue() {
  try {
    return await Promise.all(
      revenue.map(async (rev) => await revenueService.createOrUpdate(rev))
    );
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

async function seedData() {
  await dbConnect()
  if (process.env.TRUNCATE) {
    await userService.deleteAll();
    await customerService.deleteAll();
    await invoiceService.deleteAll();
    await revenueService.deleteAll();
  }

  await seedUsers();
  await seedInvoices(await seedCustomers());
  await seedRevenue();

  exit(0);
}

seedData();
