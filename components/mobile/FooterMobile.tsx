import React from "react";
import {
  RxGithubLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import Image from "next/image";

const FooterMobile = () => {
  return (
    <footer className="w-full px-4 py-5 text-black">
      <div className="max-w-sm mx-auto flex flex-col items-center text-center gap-3">

        {/* Profile Image */}
        <div className="relative w-16 h-16">
          <div className="w-full h-full rounded-full overflow-hidden bg-black">
            <Image
              src="/shyam.jpg"
              alt="Ghanashyam"
              width={64}
              height={64}
              className="object-cover object-bottom"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <p className="text-[13px]  text-black">
            Thanks for watching through my portfolio
          </p>
          <p className="text-[11px] text-black/60">
            Work in progress
          </p>
            <p className="text-[11px] text-black/60">
           View on desktop for the best experience.
          </p>
        </div>

        {/* Name Signature */}
        <p className="text-[14px] tracking-wide text-black/80">
          — Ghanashyam —
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mt-1">
          <a
            href="#"
            aria-label="Twitter"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-black/5 text-black/70 active:bg-black/10 transition"
          >
            <RxTwitterLogo className="text-base" />
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-black/5 text-black/70 active:bg-black/10 transition"
          >
            <RxLinkedinLogo className="text-base" />
          </a>

          <a
            href="#"
            aria-label="GitHub"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-black/5 text-black/70 active:bg-black/10 transition"
          >
            <RxGithubLogo className="text-base" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-black/40 mt-1">
          © 2026 Ghanashyam
        </p>
      </div>
    </footer>
  );
};

export default FooterMobile;
