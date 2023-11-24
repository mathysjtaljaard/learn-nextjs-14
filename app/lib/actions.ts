"use server";

import { z } from "zod";
import { invoiceService } from "./services/invoice.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.any(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"])
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const {
    customerId: customer,
    amount,
    status,
  } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  await invoiceService.createOrUpdate({
    amount: amount * 100,
    customer,
    status,
    date: new Date(),
  });

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const {
    customerId: customer,
    amount,
    status
  } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status")
  });

  await invoiceService.createOrUpdate({
    id,
    amount: amount * 100,
    customer,
    status,
  });

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  await invoiceService.deleteInvoice(id)
  revalidatePath('/dashboard/invoices');
}
