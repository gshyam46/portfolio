import { PROJECTS } from "@/constants/projects";
import Image from "next/image";

export default function ProjectsMobile() {
    return (
        <section className="w-full px-4 py-8">
            <h2 className="text-[20px] font-semibold text-white mb-6 text-center">Projects</h2>
            <div className="flex flex-col gap-3">
                {PROJECTS.map((project: any) => (
                    <div
                        key={project.id}
                        className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
                    >
                        {project.images?.[0] && (
                            <div className="w-12 h-12 flex-shrink-0 relative overflow-hidden rounded-md bg-white/10">
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}

                        <div className="flex flex-col justify-center min-w-0">
                            <h3 className="text-[14px] font-medium text-white truncate pr-2">
                                {project.title}
                            </h3>
                            <p className="text-[12px] text-white/60 line-clamp-1">
                                {project.summary}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
