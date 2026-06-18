"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="max-w-6xl mx-auto px-5 py-24 scroll-mt-16 border-t border-line"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <SectionHeading subtitle="contact">Let&apos;s talk</SectionHeading>
          <p className="text-muted text-lg leading-relaxed -mt-4">
            Open to full-time roles, freelance, and interesting side projects.
            Drop a line — I usually reply within a day.
          </p>
          <a
            href="mailto:rajandalvadi2510@gmail.com"
            className="inline-block mt-6 font-mono text-accent hover:underline"
          >
            rajandalvadi2510@gmail.com
          </a>
        </div>

        <form
          className="space-y-4"
          action={async (formData) => {
            const { error } = await sendEmail(formData);
            if (error) {
              toast.error(error);
              return;
            }
            toast.success("Message sent — talk soon!");
          }}
        >
          <input
            className="w-full h-12 px-4 border border-line bg-surface text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="your@email.com"
          />
          <textarea
            className="w-full h-40 border border-line bg-surface p-4 text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors resize-none"
            name="message"
            placeholder="What's on your mind?"
            required
            maxLength={5000}
          />
          <SubmitBtn />
        </form>
      </div>
    </motion.section>
  );
}
