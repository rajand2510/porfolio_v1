"use server";

import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";

export type SendEmailState = {
  error?: string;
  success?: boolean;
};

const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ?? "rajandalvadi2510@gmail.com";
const CONTACT_FROM =
  process.env.RESEND_FROM_EMAIL ?? "Contact Form <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const sendEmail = async (
  formData: FormData
): Promise<SendEmailState> => {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();

    if (!apiKey) {
      return {
        error:
          "Contact form is not configured. Please email rajandalvadi2510@gmail.com directly.",
      };
    }

    const senderEmail = formData.get("senderEmail");
    const message = formData.get("message");

    if (!validateString(senderEmail, 500)) {
      return { error: "Please enter a valid email address." };
    }

    if (!validateString(message, 5000)) {
      return { error: "Please enter a message (max 5000 characters)." };
    }

    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      return { error: "Please enter a valid email address." };
    }

    const resend = new Resend(apiKey);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br>");

    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: `Portfolio message from ${trimmedEmail}`,
      reply_to: trimmedEmail,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New portfolio contact message</h2>
          <p><strong>From:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="line-height: 1.6;">${safeMessage}</p>
        </div>
      `,
      text: `New portfolio contact message\n\nFrom: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("sendEmail error:", error);
    return { error: getErrorMessage(error) };
  }
};
