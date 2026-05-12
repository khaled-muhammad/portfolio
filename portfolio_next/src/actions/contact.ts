"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContact(
  _prev: unknown,
  formData: FormData,
): Promise<{ ok: false; error: string } | { ok: true }> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || undefined;
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length < 2 || !email || message.length < 10) {
    return { ok: false as const, error: "Please fill all fields." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: name.slice(0, 200),
        email: email.slice(0, 254),
        phone: phone?.slice(0, 30),
        message: message.slice(0, 2000),
      },
    });
  } catch {
    return {
      ok: false as const,
      error:
        "Could not save your message (database unavailable). Try again later.",
    };
  }

  revalidatePath("/dashboard/messages");
  return { ok: true as const };
}
