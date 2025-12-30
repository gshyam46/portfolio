"use client";

import { motion } from "framer-motion";
import GlassHeading from "./ui/GlassHeading";

export default function Contact() {
  return (
    
    <section className="relative w-full z-30">
      {/* <video
                    autoPlay
                    muted
                    loop
                    className="scale-[1.3] absolute top-[-520px] left-0 z-[0] object-cover"
                    style={{
                      filter:
                        "brightness(0.75) sepia(1) hue-rotate(-10deg) saturate(6) contrast(1.3)",
                                    }}
                  >
                    <source src="/blackhole.webm" type="video/webm" />
                  </video> */}
      {/* Heading */}
      <div className="flex justify-center mb-10">
        <GlassHeading
          text="Reach Out"
          width="w-[100%]"
          position="center"
          fontSize="2.2rem"
          height="h-[60px]"
        />
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-3xl glass-card px-8 py-10 rounded-3xl"
      >
        <form className="flex flex-col gap-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" placeholder="you@example.com" />
          </div>

          {/* Subject */}
          <Input label="Subject" placeholder="What's this about?" />

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="
                w-full
                rounded-xl
                bg-white/5
                border border-white/10
                px-4 py-3
                text-sm text-white
                placeholder:text-white/40
                focus:outline-none
                focus:ring-2 focus:ring-white/20
                resize-none
              "
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="
                px-6 py-2
                text-sm
                font-medium
                text-white/80
                hover:text-white
                bg-white/10
                hover:bg-white/15
                rounded-md
                transition
                active:scale-95
              "
            >
              Send message
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

/* ------------------- */
/* Input Component     */
/* ------------------- */

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white/70">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          bg-white/5
          border border-white/10
          px-4 py-3
          text-sm text-white
          placeholder:text-white/40
          focus:outline-none
          focus:ring-2 focus:ring-white/20
        "
      />
    </div>
  );
}