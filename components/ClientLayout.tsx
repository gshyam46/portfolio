"use client";

import { useState } from "react";
import StarsCanvas from "@/components/StarCanvas";
import LoadingWarp from "@/components/ui/LoadingWarp";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingWarp onFinish={() => setLoaded(true)} />}

      {loaded && (
        <>
          <StarsCanvas />
          {children}
        </>
      )}
    </>
  );
}
