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

const bcrypt = require("bcrypt");

async function seedUsers() {
  try {
    return await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return await userService.create({
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
        async (customer) => await customerService.create(customer)
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
        async (invoice) => await invoiceService.create(invoice)
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
      revenue.map(async (rev) => await revenueService.create(rev))
    );
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

async function seedData() {
  if (process.env.TRUNCATE) {
    await userService.deleteAll();
    await customerService.deleteAll();
    await invoiceService.deleteAll();
    await revenueService.deleteAll();
  }

  const users = await seedUsers();
  const createdCustomers = await seedCustomers();
  const invoices = await seedInvoices(createdCustomers);
  const revenue = await seedRevenue();

  exit(0);
}

seedData();
