"use server";

import { z } from "zod";
import { customerService } from "./services/customer.service";
import { invoiceService } from "./services/invoice.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.any(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.number(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId: customer, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  await invoiceService.createOrUpdate({
    amount: amount * 100,
    customer,
    status,
    date: new Date()
  })

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
