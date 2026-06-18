import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type SubmitBtnProps = {
  pending?: boolean;
};

export default function SubmitBtn({ pending: pendingProp }: SubmitBtnProps) {
  const { pending: formPending } = useFormStatus();
  const pending = pendingProp ?? formPending;

  return (
    <button
      type="submit"
      className="group inline-flex items-center justify-center gap-2 h-12 px-8 bg-ink text-[var(--bg)] font-medium transition-all hover:bg-accent disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--bg)] border-t-transparent" />
      ) : (
        <>
          Send message
          <FaPaperPlane className="text-xs opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </>
      )}
    </button>
  );
}
