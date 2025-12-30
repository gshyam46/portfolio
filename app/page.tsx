
"use client";

import { navItems } from "@/constants";

import Hero from "@/components/Hero";


import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
// import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Publications from "@/components/Publications";
import Contact from "@/components/Contact";
import GlobeScene from "@/components/ui/GlobeScene";

const Home = () => {
  return (

    <main className="h-full w-full">
      <div className="flex flex-col ">
        <FloatingNav navItems={navItems} />
        <section id="home" className=" flex min-h-screen ">
          <Hero />
        </section>

        <section id="experience" className="min-h-screen flex items-center justify-center ">
  
          <Experience />
        </section>
        
    
        <section id="skills" className="min-h-screen flex items-center justify-center ">
          <Skills />
        </section>

        <section id="projects" className="min-h-screen flex ">

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





      </div>
    </main>
  );
};

export default Home;



