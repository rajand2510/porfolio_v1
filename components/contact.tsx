"use client";

import { FormEvent, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import { toast } from "sonner";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setPending(true);
    try {
      const result = await sendEmail(formData);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Message sent — I'll get back to you soon!");
      form.reset();
    } catch {
      toast.error(
        "Something went wrong. Please email rajandalvadi2510@gmail.com directly."
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="max-w-6xl mx-auto px-4 sm:px-5 py-16 sm:py-24 scroll-mt-28 sm:scroll-mt-36 border-t border-line"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
        <div>
          <SectionHeading subtitle="contact">Let&apos;s talk</SectionHeading>
          <p className="text-muted text-lg leading-relaxed -mt-4">
            Open to full-time roles, freelance, and interesting side projects.
            Drop a line — I usually reply within a day.
          </p>
          <a
            href="mailto:rajandalvadi2510@gmail.com"
            className="inline-block mt-6 font-mono text-sm sm:text-base text-accent hover:underline break-all"
          >
            rajandalvadi2510@gmail.com
          </a>
        </div>

        <form
          ref={formRef}
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full h-12 px-4 border border-line bg-surface text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors disabled:opacity-60"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="your@email.com"
            autoComplete="email"
            disabled={pending}
          />
          <textarea
            className="w-full h-40 border border-line bg-surface p-4 text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors resize-none disabled:opacity-60"
            name="message"
            placeholder="What's on your mind?"
            required
            maxLength={5000}
            disabled={pending}
          />
          <SubmitBtn pending={pending} />
        </form>
      </div>
    </motion.section>
  );
}
