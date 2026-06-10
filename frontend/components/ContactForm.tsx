"use client";

import { useState } from "react";
import DivisionLine from "@/components/DivisionLine";
import SocialLinks from "@/components/SocialLinks";

type FormState = "idle" | "loading" | "success" | "error";

const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("loading");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setFormState(data.success ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full mx-auto">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-12 px-8">
        {/* Page Header */}
        <div className="w-full mb-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Contact</h1>
          <p className="mt-3 text-base text-gray-500 max-w-lg">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <SocialLinks />

        <div className="w-full mt-8 mb-2">
          <DivisionLine />
        </div>

        {/* Form */}
        {formState === "success" ? (
          <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-center">
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Sent
            </span>
            <p className="text-2xl font-semibold text-gray-900">Message received.</p>
            <p className="text-sm text-gray-500">I'll get back to you as soon as I can.</p>
            <button
              onClick={() => setFormState("idle")}
              className="mt-4 text-sm font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="w-full max-w-xl flex flex-col gap-6 py-10">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-0"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-0"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="What's on your mind?"
                rows={6}
                required
                className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-0"
              />
            </div>

            {/* Error message */}
            {formState === "error" && (
              <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={formState === "loading"}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-6 py-3 rounded-lg"
              >
                {formState === "loading" ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default ContactForm;
