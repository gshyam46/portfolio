import React from "react";
import {
  RxGithubLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import Image from "next/image";

const FooterMobile = () => {
  return (
    <div className="w-full bg-transparent text-white px-4 py-4 overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center max-w-sm mx-auto">
        
        {/* Profile Image - Smaller for mobile */}
        <div className="relative w-20 h-20 mb-3">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
            <Image
              src="/shyam.jpg"
              alt="Ghanashyam"
              width={80}
              height={80}
              className="rounded-full object-cover object-bottom"
            />
          </div>
        </div>

        {/* Main Message - Mobile typography */}
        <div className="text-center mb-3">
          <h3 className="text-[16px] font-semibold text-white mb-1">
            Thanks for viewing my Portfolio!
          </h3>
          <p className="text-[12px] text-white/70">
            This portfolio is in progress.
          </p>
        </div>

        {/* Name - Mobile appropriate size */}
        <h1 className="text-[18px] font-bold text-white mb-4 text-center tracking-wider">
          - GHANASHYAM -
        </h1>

        {/* Social Media - Compact layout */}
        <div className="w-full mb-4">
          <h4 className="text-[13px] font-semibold text-white/90 text-center mb-2">
            Connect
          </h4>
          
          <div className="flex justify-center gap-4">
            <a 
              href="#" 
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] justify-center"
            >
              <RxTwitterLogo className="text-base text-white/80" />
              <span className="text-[9px] text-white/60">Twitter</span>
            </a>
            
            <a 
              href="#" 
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] justify-center"
            >
              <RxLinkedinLogo className="text-base text-white/80" />
              <span className="text-[9px] text-white/60">LinkedIn</span>
            </a>
            
            <a 
              href="#" 
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] justify-center"
            >
              <RxGithubLogo className="text-base text-white/80" />
              <span className="text-[9px] text-white/60">GitHub</span>
            </a>
          </div>
        </div>

        {/* Copyright - Mobile typography */}
        <div className="text-[11px] text-white/50 text-center">
          &copy; Ghanashyam 2026. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;