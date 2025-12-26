
"use client";

import { navItems } from "@/constants";

import Hero from "@/components/Hero";


import Image from "next/image";


import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
// import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home = () => {
  return (

    <main className="h-full w-full">
      <div className="flex flex-col ">
        <FloatingNav navItems={navItems} />
        <section id="home" className="min-h-screen flex ">
          <Hero />
        </section>

        <section id="experience" className="min-h-screen flex items-center justify-center">
          {/* <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <p className="text-lg">Coming soon...</p>
          </div> */}
          <Experience />
        </section>

        <section id="skills" className="min-h-screen flex items-center justify-center">
          <Skills />
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Projects</h2>
            <p className="text-lg">Coming soon...</p>
          </div>
        </section>

        <section id="certifications" className="min-h-screen flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Certifications</h2>
            <p className="text-lg">Coming soon...</p>
          </div>
        </section>

        <section id="publications" className="min-h-screen flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Publications</h2>
            <p className="text-lg">Coming soon...</p>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Contact</h2>
            <p className="text-lg">Coming soon...</p>
          </div>
        </section>





      </div>
    </main>
  );
};

export default Home;



