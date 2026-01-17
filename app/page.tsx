"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/constants";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Publications from "@/components/Publications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home=()=> {
  const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const sectionMap = [
    { id: "home", index: 0 },
    { id: "experience", index: 1 },
    { id: "skills", index: 2 },
    { id: "projects", index: 3 },
    { id: "certifications", index: 4 },
    { id: "publications", index: 5 },
    { id: "contact", index: 6 },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const match = sectionMap.find(
            s => s.id === entry.target.id
          );
          if (match) {
            setActiveIndex(match.index);
            console.log("Active section:", match.id);
          }
        }
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.01,
    }
  );

  sectionMap.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);


  return (
    <main className="h-full w-full relative">
      <div className="flex flex-col relative z-10">
         <FloatingNav
        navItems={navItems}
        activeIndex={activeIndex}
      />

        <section id="home" className="flex min-h-screen">
          <Hero />
        </section>

        <section id="experience" className="min-h-screen flex items-center justify-center">
          <Experience />
        </section>
        
        <section id="skills" className="min-h-screen flex items-center justify-center">
          <Skills />
        </section>

        <section id="projects" className="min-h-screen flex">
          <Projects />
        </section>

        <section id="certifications" className="min-h-screen flex items-center justify-center">
          <Certifications />
        </section>

        <section id="publications" className="min-h-screen flex items-center justify-center">
          <Publications />
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center">
          <Contact />
        </section>

        {/* Footer with dotted background */}
        <div className="relative dotted-bg flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Home;



