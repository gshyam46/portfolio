"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";
import GlassHeading from "./ui/GlassHeading";
import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import ElectricBorder from "./ElectricBorder";

const MAX_MESSAGES = 3;
const STORAGE_KEY = "contact_message_count";

export default function Contact() {
  const { isMobile } = useDevice();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "limit">("idle");
  const [count, setCount] = useState(0);

  /* ------------------ */
  /* Form state         */
  /* ------------------ */
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ------------------ */
  /* Load send count    */
  /* ------------------ */
  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY) || 0);
    setCount(saved);
    if (saved >= MAX_MESSAGES) setStatus("limit");
  }, []);

  /* ------------------ */
  /* Validation         */
  /* ------------------ */
  const validate = () => {
    const next: Record<string, string> = {};

    if (values.name.trim().length < 2)
      next.name = "Please enter your name.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";

    if (values.subject.trim().length < 3)
      next.subject = "Subject is too short.";

    if (values.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* ------------------ */
  /* Submit handler     */
  /* ------------------ */
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (!formRef.current) return;
    if (count >= MAX_MESSAGES) {
      setStatus("limit");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      const newCount = count + 1;
      localStorage.setItem(STORAGE_KEY, String(newCount));
      setCount(newCount);

      formRef.current.reset();
      setValues({ name: "", email: "", subject: "", message: "" });

      setStatus(newCount >= MAX_MESSAGES ? "limit" : "success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    values.name &&
    values.email &&
    values.subject &&
    values.message &&
    Object.keys(errors).length === 0;

  return (
    <section className="relative w-full z-30">
      {/* Heading */}
      <div className="flex justify-center mb-8 sm:mb-10">
        {isMobile ? (
          <div className="relative w-[80%]">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />
            <h2 className="relative text-center text-[16px] font-semibold text-white px-4 py-2">
              REACH OUT
            </h2>
          </div>
        ) : (
          <GlassHeading
            text="Reach Out"
            width="w-[100%]"
            position="center"
            fontSize="2.2rem"
            height="h-[60px]"
          />
        )}
      </div>

      {/* HALO + FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex justify-center"
      >
        {/* Halo glow */}
        <div
          className="
            absolute inset-0 rounded-full
            bg-[radial-gradient(circle,rgba(255,200,120,0.35),transparent_70%)]
            blur-3xl scale-110 pointer-events-none
          "
        />

        <div
          className={`relative rounded-full p-[2px] ${
            isMobile ? "w-[92vw]" : "w-[520px]"
          } bg-gradient-to-br from-white-300/60 via-white-200/40 to-transparent`}
        >
          <ElectricBorder color="#ffdc7d" speed={1} chaos={0.12}>
            <div
              className={`rounded-full glass-card ${
                isMobile ? "px-6 py-8" : "px-10 py-12"
              }`}
            >
              <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">
                <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "sm:grid-cols-2"}`}>
                  <Input
                    label="Name"
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => setValues({ ...values, name: v })}
                  />
                  <Input
                    label="Email"
                    value={values.email}
                    error={errors.email}
                    onChange={(v) => setValues({ ...values, email: v })}
                  />
                </div>

                <Input
                  label="Subject"
                  value={values.subject}
                  error={errors.subject}
                  onChange={(v) => setValues({ ...values, subject: v })}
                />

                <div>
                  <textarea
                  
                    name="message"
                    rows={isMobile ? 4 : 5}
                    value={values.message}
                    onChange={(e) => setValues({ ...values, message: e.target.value })}
                    placeholder="Write your message..."
                    className={`w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white resize-none border ${
                      errors.message ? "border-red-400/60" : "border-white/10"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={!isFormValid || loading || status === "limit"}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: status === "limit" ? 1 : 1.04 }}
                  className={`relative overflow-hidden rounded-xl px-6 py-3 font-medium golden-btn ${
                    !isFormValid || status === "limit"
                      ? "bg-white/5 text-white/40 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-400 to-yellow-300 text-black"
                  }`}
                >
                  <span className="golden-btn-text">
                    {loading
                      ? "Sending..."
                      : status === "limit"
                      ? "Limit reached"
                      : "Send message"}
                  </span>
                  <span className="golden-btn-border" />
                </motion.button>

                {/* Feedback */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-400 text-sm text-center"
                    >
                      Message sent successfully ✓
                    </motion.p>
                  )}

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm text-center"
                    >
                      Failed to send. Please try again.
                    </motion.p>
                  )}

                  {status === "limit" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-white/50 text-sm text-center"
                    >
                      Message limit reached. Please try again later.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </ElectricBorder>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------- */
/* Input Component     */
/* ------------------- */
function Input({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/90 text-sm">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-xl bg-white/5 px-4 py-3 text-sm text-white border focus:outline-none ${
          error ? "border-red-400/60" : "border-white/10"
        }`}
      />
      {error && <p className="text-red-400 text-[11px]">{error}</p>}
    </div>
  );
}
